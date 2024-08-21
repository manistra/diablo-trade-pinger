import { removeDuplicates } from './utils/removeDuplicates'
import { withTimeout } from './utils/withTimeout'
const { setTimeout } = require('node:timers/promises')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin())

export let browser

const godmodeActive = localStorage.getItem('godmode') === 'true'
const TIMEOUT = 5000
const IS_PUPETEER_DEV_ENV = import.meta.env.RENDERER_VITE_PUPETEER_DEV?.toString() === 'true'
const PUPETEER_TESTING_URL =
  'https://diablo.trade/listings/items?equipment=bow&group1=ec7233d732f8602%7Ce4fcc86f399018c%40greater%7C9befc12052e030c'

export const snoopForItems = async ({
  executablePath,
  handleAddPings,
  listings,
  showBrowser,
  pagesPerRun = 5,
  setCurrentPage
}) => {
  console.log('Started snooping...')
  let finalResult = []

  browser = await puppeteer.launch({
    ...(!!executablePath && { executablePath: executablePath }),
    headless: IS_PUPETEER_DEV_ENV ? false : showBrowser
  })
  const page = await browser.newPage()

  const pagesNumber = IS_PUPETEER_DEV_ENV ? 1 : pagesPerRun

  try {
    for (let i = 1; i <= pagesNumber; i++) {
      console.log('Scanning page:', i, 'out of', pagesNumber)
      setCurrentPage(i)
      const url = IS_PUPETEER_DEV_ENV
        ? PUPETEER_TESTING_URL
        : `https://diablo.trade/listings/items?mode=season%20softcore&cursor=${i}`

      await withTimeout(page.goto(url), TIMEOUT, `Navigation to page ${i} timed out`)

      await withTimeout(
        page.waitForSelector('#app-container', { visible: true, timeout: 0 }),
        TIMEOUT,
        'Waiting for #app-container timed out'
      )

      await withTimeout(
        page.waitForSelector('.WTS', { visible: true, timeout: 0 }),
        TIMEOUT,
        'Waiting for .WTS timed out'
      )

      const result = await page.evaluate((listings) => {
        const itemsToPing = []

        const elements = document.querySelectorAll('.WTS')

        const findAffixes = (element) => {
          // Get all elements that have an img with alt="separator"
          const separatorElements = Array.from(
            element.querySelectorAll('img[alt="separator"]')
          ).map((img) => img.closest('div')) // Get their closest div parent

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

        elements.forEach((element) => {
          const elementAffixes = findAffixes(element)

          listings.forEach((listing) => {
            let numberOfMatchedAffixes = 0
            // ________________________________________________________________EQUIPMENT TYPES really bad code but it works, maybe refactor later
            const isEquipmentType = element.innerText
              .toLowerCase()
              .includes(listing.equipmentType.toLowerCase())
            const isLegendary = element.innerText.toLowerCase().includes('legendary')
            const isListingEquipmentTypeOneHanded = ['axe', 'mace', 'scythe', 'sword'].includes(
              listing.equipmentType.toLowerCase()
            )
            const isTwoHanded = element.innerText.toLowerCase().includes('two-handed')
            const oneHandedGuardCondition = isListingEquipmentTypeOneHanded ? !isTwoHanded : true

            const isBow = ['bow'].includes(listing.equipmentType.toLowerCase())
            const isCrossbow = element.innerText.toLowerCase().includes('crossbow')
            const crossBowGuardCondition = isBow ? !isCrossbow : true
            // ________________________________________________________________EQUIPMENT TYPES

            if (
              isEquipmentType &&
              isLegendary &&
              oneHandedGuardCondition &&
              crossBowGuardCondition
            ) {
              listing.affixes.forEach(async (listingAffix) => {
                const listingAffixNameLower = listingAffix.name.toLowerCase()
                const matchedElementAffix = elementAffixes.find((elementAffix) =>
                  elementAffix.value.includes(listingAffixNameLower)
                )

                if (matchedElementAffix) {
                  if (!listingAffix.isGreaterAffix) {
                    numberOfMatchedAffixes++
                  } else {
                    if (matchedElementAffix.isGreaterAffix) numberOfMatchedAffixes++
                  }
                }
              })

              if (
                (listing.affixes.length >= 2 && numberOfMatchedAffixes >= 2) ||
                (listing.affixes.length === 1 && numberOfMatchedAffixes > 0)
              ) {
                const tradeElement = element.querySelector('.backdrop-blur')
                const offerState = tradeElement.textContent.toLowerCase().includes('taking offers')
                  ? 'Taking Offers'
                  : 'Exact Price'

                const price = tradeElement.querySelector('h4').textContent

                const listedElement = tradeElement.querySelector('span')
                const listed = listedElement.textContent

                if (
                  price.toLowerCase().includes('offer') ||
                  Number(price.replace(/,/g, '')) <= Number(listing.maxPrice) ||
                  listing.maxPrice === 0
                )
                  itemsToPing.push({
                    diabloTradeId: tradeElement.id,
                    listing: listing,
                    createdAt: new Date().toISOString(),
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
      finalResult = [...finalResult, ...result]

      await setTimeout(godmodeActive ? 150 : 450)
    }

    handleAddPings(removeDuplicates(finalResult, 'diabloTradeId'))
  } catch (error) {
    console.error('An error occurred:', error.message)
  } finally {
    if (!IS_PUPETEER_DEV_ENV) await browser.close()
  }
}
