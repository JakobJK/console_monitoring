// https://www.target.com/p/playstation-5-console/-/A-81114595

const puppeteer = require('puppeteer')

const url = 'https://www.target.com/p/playstation-5-console/-/A-81114595'

module.exports = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  })
  const page = await browser.newPage()
  await page.goto(url, {
    // We have to idle here in order for Taget to load the status of the PS5
    waitUntil: 'networkidle2',
  })
  const scrapedData = await page.evaluate(() =>
    Array.from(document.getElementsByClassName('h-text-orangeDark')).map(
      link => link.innerHTML
    )
  )

  await page.close()
  await browser.close()

  return {
    store: 'target',
    status: scrapedData[0] !== 'Sold out',
  }
}

//https://www.walmart.com/ip/Sony-PlayStation-5-Video-Game-Console/994712501
