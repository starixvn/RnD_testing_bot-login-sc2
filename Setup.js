import playwright from 'playwright'
import * as config from './config/config'
const fs = require('fs')

const chai = require('chai')
const expect = chai.expect

before(async () => {
    global.wsMessageReceived = []
    global.browser = await playwright[config.setting.browser].launch({
       headless: config.setting.headless ,
       args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-gpu', '--use-gl=swiftshader','--enable-webgl']
      })
    const context = await browser.newContext({
        viewport: {
          width: config.setting.viewport.width,
          height: config.setting.viewport.height
        }
    });
    const page = await context.newPage();
    global.page = page
    global.context = context
    global.isHear = true
    global.balance = parseFloat("0.00")
    global.env = process.env.NODE_ENV || 'cf_prod'
    global.expect = expect
    global.chai = chai
    global.fs = fs
    global.t = 0
    global.msg = ""
    global.ws = ""
    global.flagLogMemberSite = true
    global.attempt = 1
})

