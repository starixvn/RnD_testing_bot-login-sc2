const pw = require('playwright')
const game = "Gamelobby"
const addContext = require('mochawesome/addContext')
import * as config from './../config/config'
import * as utils from '../util/utils'
import * as GameLobbyLocator from './GameLobby_Locator'

describe('GameLobby', ()=>{
  before(async function(){
    await utils.wsHearMessageOn()
  })
  afterEach(async function(){
    if(this.currentTest.state == 'failed'){
      var __filename = this.currentTest.title.trim()
      await page.screenshot({ path: `./Report/Pictures/${__filename}.png`});
      await addContext (this,`./Pictures/${__filename}.png` )
    }
    await context.close()
  })
  it('Verify SSO succesfully on PRO', async()=>{
    let chknw = await utils.checkNetwork()
    let chk = true
    if(chknw === true){
      chk = await utils.Login(env,"Gamelobby1");
      if(chk === false){
        t=0
        await utils.clearLog()
        await utils.logOut()
        chk = await utils.Login(env,"Gamelobby2");
      }
    } else {
      await utils.shouldBeEqual(true,false,"Network has issue")
    }
  }).timeout(270000)
})