import { MemberSiteLocator } from './MemberSite_Locator'
import * as config from '../config/config'
import * as utils from '../util/utils'
const chai = require('chai')
const expect = chai.expect

export const login = async(_env,_game) => {
    // Login for SIT/UAT/PRO
    try {
        // Go to Membersite Url
        await utils.navigate(config[_env].url)
        await utils.waitForLoadState()
        await utils.sleep(10000)
        // Change Language
        // await utils.selectDrp(MemberSiteLocator.drpLanguage,MemberSiteLocator.optLanguage)
        // await utils.waitForLoadState()
        // // await utils.navigate(config[_env].url)
        // // await utils.waitForLoadState()
        await utils.CaptureSubImageToFile('secode.png',1113,16,37,15)
        let secode = await utils.getNumberFromImage('secode.png')
        if(secode.length <4){
            console.log('re secode')
            await page.reload()
            // await utils.sleep(5000)
            await utils.CaptureSubImageToFile('secode.png',1113,16,37,15)
            await utils.sleep(200)
            secode = await utils.getNumberFromImage('secode.png')
            }
        console.log(parseInt(secode));


        // Input Username and Password
        await utils.sendKeys('id=username',config.cf_prod.username[_game])
        await utils.sendKeys('id=password',config.cf_prod.password)
        await utils.sendKeys('id=validation',secode.trim())    
        await utils.clickEl("xpath=//*[text()='Đăng nhập']")
        await utils.sleep(5000)
        // // Enter Login button
        // if(_env == 'cf_prod'){
        //     await utils.clickEl("xpath=//*[text()='Đăng nhập']")
        // } else {
        //     await utils.clickEl(MemberSiteLocator.btnLogin)
        // }
        
    } catch (error) {
        console.error(error.message);
    }
}
    
    //Login for local
export const login_local = async(_env,_game) => {
        try{
            let flag
            // Go to Membersite Url
            await utils.navigate(config[_env].url)
            await utils.waitForLoadState()

            // Innput MemberID
            await utils.sendKeys(MemberSiteLocator.txtMemberId,config[_env].memberId[_game])

            // Click on Gen Token
            await utils.clickEl(MemberSiteLocator.btnGetToken)
            flag = await utils.isValueNotEqualOnAttribute(MemberSiteLocator.lblRedirect,"href","#")
            expect(flag.Val, 'Fail on get token from Simulator').to.be.true
            // Navigate to SabaClub
            let url = (await utils.getAttribute(MemberSiteLocator.lblRedirect,"href")).toString()
            await utils.screenShot('ImgGameLobby'+Math.random())
            await utils.navigate((await url).slice(0, -1))
        } catch (error) {
            console.error(error.message)
        }
}