const puppeteer = require('puppeteer')

const url =
  'https://www.walmart.com/ip/Sony-PlayStation-5-Video-Game-Console/994712501'

module.exports = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  })
  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'domcontentloaded',
  })
  const scrapedData = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.prod-blitz-copy-message > b')).map(
      link => link.innerHTML
    )
  )

  await page.close()
  await browser.close()

  return {
    store: 'walmart',
    status: scrapedData[0] !== 'out of stock',
  }
}

// https://www.walmart.com/ip/Sony-PlayStation-5-Video-Game-Console/994712501
