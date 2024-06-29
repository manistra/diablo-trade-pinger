import { removeDuplicates } from './utils/removeDuplicates'
const { setTimeout } = require('node:timers/promises')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin())

export const snoopForItems = async ({ executablePath, handleAddPings, listings, showBrowser }) => {
  console.log('Started snooping...')
  let finalResult = []

  const browser = await puppeteer.launch({
    ...(!!executablePath && { executablePath: executablePath }),
    headless: !showBrowser
  })
  const page = await browser.newPage()

  for (let i = 1; i <= 15; i++) {
    await page.goto(`https://diablo.trade/listings/items?mode=season%20softcore&cursor=${i}`)

    await page.waitForSelector('#app-container', { visible: true, timeout: 0 })

    const result = await page.evaluate((listings) => {
      const itemsToPing = []

      const elements = document.querySelectorAll('.WTS')

      const findAffixes = (element) => {
        // Get all elements that have an img with alt="separator"
        const separatorElements = Array.from(element.querySelectorAll('img[alt="separator"]')).map(
          (img) => img.closest('div')
        ) // Get their closest div parent

        // Get the last two separator elements
        const lastTwoSeparators = separatorElements.slice(-3)

        if (lastTwoSeparators.length < 2) {
          return []
        }

        // Get all elements between the last two separator elements
        const affixElements = []
        let currentNode = lastTwoSeparators[0].nextElementSibling

        while (currentNode && currentNode !== lastTwoSeparators[1]) {
          if (currentNode.hasAttribute('data-search')) {
            affixElements.push(currentNode)
          }
          currentNode = currentNode.nextElementSibling
        }

        return affixElements.map((el) => {
          const isGreaterAffix = Array.from(el.childNodes).some(
            (childNode) => childNode.alt === 'greater affix'
          )

          return { value: el.textContent.trim().toLowerCase(), isGreaterAffix: isGreaterAffix }
        })
      }

      const getMatchedAffixValue = (originalString, substring) => {
        let index = originalString.toLowerCase().indexOf(substring)

        if (index !== -1) {
          return originalString.substring(0, index).replace(/%/g, '').replace(/\s/g, '')
        } else {
          return originalString.replace(/%/g, '').replace(/\s/g, '')
        }
      }

      elements.forEach((element) => {
        const elementAffixes = findAffixes(element)

        listings.forEach((listing) => {
          let numberOfMatchedAffixes = 0

          if (
            element.innerText.toLowerCase().includes(listing.equipmentType.toLowerCase()) &&
            element.innerText.toLowerCase().includes('legendary')
          ) {
            listing.affixes.forEach(async (affix) => {
              const affixNameLower = affix.name.toLowerCase()
              const matchedElementAffix = elementAffixes.find((elementAffix) =>
                elementAffix.value.includes(affixNameLower)
              )

              if (matchedElementAffix) {
                if (affix.minValue == 0) {
                  numberOfMatchedAffixes++
                } else {
                  const matchedAffixValue = getMatchedAffixValue(
                    matchedElementAffix.value,
                    affixNameLower
                  )
                  if (Number(matchedAffixValue) >= Number(affix.minValue)) numberOfMatchedAffixes++
                }
              }
            })

            if (
              (listing.affixes.length >= 2 && numberOfMatchedAffixes >= 2) ||
              (listing.affixes.length === 1 && numberOfMatchedAffixes === 1)
            ) {
              const tradeElement = element.querySelector('.backdrop-blur')
              const offerState = tradeElement.textContent.toLowerCase().includes('taking offers')
                ? 'Taking Offers'
                : 'Exact Price'

              const price = tradeElement.querySelector('h4').textContent

              const listedElement = tradeElement.querySelector('span')
              const listed = listedElement.textContent

              if (
                price.toLowerCase() == 'Make an Offer!' ||
                Number(price.replace(/,/g, '')) <= Number(listing.maxPrice)
              )
                itemsToPing.push({
                  diabloTradeId: tradeElement.id,
                  listing: listing,
                  item: {
                    offerState: offerState,
                    listedTime: listed,
                    price: price,
                    affixes: elementAffixes
                  }
                })
            }
          }
        })
      })

      return itemsToPing
    }, listings)
    const existingIds = finalResult.map((item) => item.diabloTradeId)
    const uniqueItems = result.filter((item) => !existingIds.includes(item.diabloTradeId))
    finalResult = [...finalResult, ...uniqueItems]

    await setTimeout(300)
  }

  handleAddPings(removeDuplicates(finalResult, 'diabloTradeId'))

  // Close browser after timeout and cleanup
  await browser.close()
}
