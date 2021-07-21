const puppeteer = require('puppeteer')

const url =
  'https://www.gamestop.com/video-games/playstation-5/consoles/products/playstation-5/11108140.html'

module.exports = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  })
  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'domcontentloaded',
  })
  const scrapedData = await page.evaluate(() =>
    Array.from(document.querySelectorAll('h1')).map(link => link.innerHTML)
  )

  await page.close()
  await browser.close()

  return {
    store: 'gamestop',
    status:
      scrapedData[0] !==
      'Sorry we could not find the page you were looking for.',
  }
}

//https://www.walmart.com/ip/Sony-PlayStation-5-Video-Game-Console/994712501
