import { GameLobbyLocator } from './GameLobby_Locator'
import * as utils from '../util/utils'
export const verifyLoginSuccessfully = async() => {
        // console.log(GameLobbyLocator.AccountName.ImageCompareAccountName)
        // return await utils.findImage(
        //     GameLobbyLocator.AccountName)
        // Verify Socket
        return await utils.wsFindMessage('{"Authorized":true')
}