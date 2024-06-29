const { setTimeout } = require('node:timers/promises')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin())

export const snoopForItems = async ({ executablePath, handleAddPings, listings }) => {
  console.log('Started snooping...')
  let finalResult = []

  const browser = await puppeteer.launch({
    ...(!!executablePath && { executablePath: executablePath }),
    headless: true
  })
  const page = await browser.newPage()

  for (let i = 1; i <= 15; i++) {
    await page.goto(`https://diablo.trade/listings/items?mode=season%20softcore&cursor=${i}`)

    await page.waitForSelector('#app-container', { visible: true, timeout: 0 })

    const result = await page.evaluate((listings) => {
      const itemsToPing = []

      const elements = document.querySelectorAll('.WTS')

      const findSmallestElementWithMatchedText = ({ element, text }) => {
        if (element.nodeType === Node.ELEMENT_NODE) {
          if (
            element.textContent.toLowerCase().includes(text) &&
            Array.from(element.parentNode.childNodes).some(
              (siblingNode) => siblingNode.alt !== 'unique star'
            )
          ) {
            let smallestElement = element
            for (let childNode of element.childNodes) {
              const childMatch = findSmallestElementWithMatchedText({
                element: childNode,
                text: text
              })
              if (
                childMatch &&
                childMatch.textContent.length < smallestElement.textContent.length
              ) {
                smallestElement = childMatch
              }
            }
            return smallestElement
          }

          for (let childNode of element.childNodes) {
            const result = findSmallestElementWithMatchedText({
              element: childNode,
              text: text
            })
            if (result) {
              return result
            }
          }
        }
        return null
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
        listings.forEach((listing) => {
          let numberOfAffixes = 0

          if (
            element.innerText
              .toLowerCase()
              .includes(
                listing.equipmentType.toLowerCase() &&
                  element.innerText.toLowerCase().includes('legendary')
              )
          ) {
            listing.affixes.forEach((affix) => {
              const affixNameLower = affix.name.toLowerCase()

              if (element.innerText.toLowerCase().includes(affixNameLower)) {
                if (affix.minValue == 0) {
                  numberOfAffixes++
                } else {
                  const smallestElement = findSmallestElementWithMatchedText({
                    element: element,
                    text: affixNameLower
                  })
                  const affixFullText = smallestElement.textContent.trim()
                  const matchedAffixValue = getMatchedAffixValue(affixFullText, affixNameLower)

                  if (Number(matchedAffixValue) >= Number(affix.minValue)) numberOfAffixes++
                }
              }
            })

            if (
              (listing.affixes.length >= 2 && numberOfAffixes >= 2) ||
              (listing.affixes.length === 1 && numberOfAffixes === 1)
            ) {
              const childElement = element.querySelector('.backdrop-blur')

              itemsToPing.push({
                ...listing,
                diabloTradeId: childElement.id,
                details: element.innerText
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

  handleAddPings(finalResult)

  // Close browser after timeout and cleanup
  await browser.close()
}
