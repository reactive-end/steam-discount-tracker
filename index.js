import { chromium } from 'playwright'

async function discountTracker() {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.goto('https://store.steampowered.com/search/?specials=1')
  const games = await page.$$eval('.search_result_row', elements =>
    elements.map(el => ({
      name: el.querySelector('.title').innerText,
      price: el.querySelector('.discount_final_price').innerText
    }))
  )

  console.log('🎮 Ofertas de Steam hoy:')
  console.table(games.slice(0, 5))
  await browser.close()
}

discountTracker()