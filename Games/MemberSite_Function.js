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
        
        // Select Sabaclub
        await utils.selectDrp(MemberSiteLocator.optQuickLink, MemberSiteLocator.optQuickLinkSabaClub)

        // Input Username and Password
        await utils.sendKeys(MemberSiteLocator.txtUsername,config[_env].username[_game])
        await utils.sendKeys(MemberSiteLocator.txtPassword,config[_env].password)

        // Enter Login button
        if(_env == 'cf_prod'){
            await utils.clickEl(MemberSiteLocator.btnLoginPro)
        } else {
            await utils.clickEl(MemberSiteLocator.btnLogin)
        }
        await utils.waitEl(MemberSiteLocator.frmMainFrame)
        await utils.navigate(await utils.getAttribute(MemberSiteLocator.frmMainFrame,'src'))
    } catch (error) {
        // Go to Membersite Url
        await utils.navigate(config[_env].url)
        await utils.waitForLoadState()
        
        // Select Sabaclub
        await utils.selectDrp(MemberSiteLocator.optQuickLink, MemberSiteLocator.optQuickLinkSabaClub)

        // Input Username and Password
        await utils.sendKeys(MemberSiteLocator.txtUsername,config[_env].username[_game])
        await utils.sendKeys(MemberSiteLocator.txtPassword,config[_env].password)

        // Enter Login button
        if(_env == 'cf_prod'){
            await utils.clickEl(MemberSiteLocator.btnLoginPro)
        } else {
            await utils.clickEl(MemberSiteLocator.btnLogin)
        }

        await utils.navigate(await utils.getAttribute(MemberSiteLocator.frmMainFrame,'src'))
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