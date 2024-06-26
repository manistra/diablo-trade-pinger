const { setTimeout } = require('node:timers/promises')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin())

async function clearFocusedInput(page) {
  await page.keyboard.press('Home')
  await page.keyboard.down('Shift')
  await page.keyboard.press('End')
  await page.keyboard.up('Shift')
  await page.keyboard.press('Backspace')
}

const getLevelRequiredValue = (value) => {
  if (value === '80' || value === 80) return '79'
  else return '80'
}

export const bumpDiabloTradeAllItems = async ({
  email,
  password,
  listingPageCount,
  logInfo,
  executablePath
}) => {
  logInfo('DIABLO TRADE BUMPER STARTED')

  const browser = await puppeteer.launch({
    ...(!!executablePath && { executablePath: executablePath }),
    headless: false
  })
  const page = await browser.newPage()
  await page.goto('https://diablo.trade')
  await page.evaluate(() => {
    window.alert = () => {}
    window.confirm = () => true
    window.prompt = () => null
  })

  await page.waitForSelector('body', { timeout: 5000 })

  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button, a'))

    const loginButton = buttons.find((button) => button.textContent.includes('Log in'))
    if (loginButton) {
      loginButton.click()
    }
  })

  logInfo('Logging into diablo.trade... Enter password and solve captcha if needed.')

  await page.waitForSelector('#accountName')
  await page.type('#accountName', email)
  await page.type('#password', password)
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button, a'))

    const loginButton = buttons.find((button) => button.textContent.includes('Log in'))
    if (loginButton) {
      loginButton.click()
    }
  })

  await page.waitForSelector('#app-container', { visible: true, timeout: 0 })
  logInfo('Logged into diablo.trade')

  const getIds = async (sel) => {
    return await page.evaluate((selector) => {
      const parentElement = document.querySelector(selector)
      const childElements = parentElement.querySelectorAll('.backdrop-blur')
      let elementsArray = []
      childElements.forEach((childElement) => {
        elementsArray.push(childElement.id)
      })
      return elementsArray
    }, sel)
  }

  let ids = []

  for (let i = 1; i <= listingPageCount; i++) {
    await page.goto(`https://diablo.trade/my-listings/items?cursor=${i}`)
    const parentSelector = '[type="listing"]'
    await page.waitForSelector(parentSelector)

    ids = [...ids, ...(await getIds(parentSelector))]
  }

  logInfo(`Found ${ids.length} items!`)
  await setTimeout(1000)

  logInfo('STARTING TO BUMP...')

  for (let i = 0; i < ids.length; i++) {
    await setTimeout(1000)

    await page.goto(`https://diablo.trade/edit/${ids[i]}`)
    await page.waitForSelector('#app-container', { visible: true, timeout: 0 })

    const levelRequiredInputSelector = '#level-required-input'

    await page.$$eval('span', (elements) => {
      for (const element of elements) {
        if (element.textContent === 'Level Required') {
          const siblingElement = element.nextElementSibling
          if (siblingElement) {
            const firstChild = siblingElement.firstElementChild
            if (firstChild) {
              firstChild.style.border = '2px solid green'
              firstChild.id = 'level-required-input'
            }
          }
          break
        }
      }
    })

    const inputElement = await page.$('#level-required-input')
    const valueHandle = await inputElement.getProperty('value')
    const inputValue = await valueHandle.jsonValue()

    await page.focus(levelRequiredInputSelector)
    await clearFocusedInput(page)
    await page
      .waitForSelector(levelRequiredInputSelector)
      .then((input) => input.type(getLevelRequiredValue(inputValue)))

    await page.$$eval('button', (elements) => {
      for (const element of elements) {
        if (element.textContent === 'Submit') {
          element.click()
          break
        }
      }
    })

    await page.$$eval('button', (elements) => {
      for (const element of elements) {
        if (element.textContent === 'Confirm') {
          element.click()
          break
        }
      }
    })

    logInfo(`${i + 1} out of ${ids.length} items bumped!`)

    await setTimeout(1000)
  }

  await browser.close()
}
