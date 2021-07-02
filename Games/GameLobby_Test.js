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
      await utils.Login(env,game);
  })
})