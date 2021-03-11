import playwright from 'playwright'
import * as config from './config/config'

const chai = require('chai')
const expect = chai.expect

before(async () => {
    global.wsMessageReceived = []
    global.browser = await playwright[config.setting.browser].launch({
       headless: config.setting.headless ,
       args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-gpu', '--use-gl=swiftshader','--enable-webgl']
      })
    const page = await browser.newPage();
    global.page = page
    const context = await browser.newContext({
        viewport: {
          width: config.setting.viewport.width,
          height: config.setting.viewport.height
        }
    });
    global.context = context
    global.isHear = true
    global.balance = parseFloat("0.00")
    global.env = process.env.NODE_ENV || 'cf_prod'
    global.expect = expect
})

