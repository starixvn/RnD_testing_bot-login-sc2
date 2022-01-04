import * as config from './../config/config'
import pixelmatch from 'pixelmatch'
import * as MemberSiteFunc from '../Games/MemberSite_Function'
import * as GameLobbyFunc from '../Games/GameLobby_Funcion'
import * as gsUtil from './gsutils'
const fs = require('fs')
const { createWorker } = require('tesseract.js')
const path = require('path')
const PNG = require('pngjs').PNG
const chai = require('chai')
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)


// Verify Message is existed
const FindMessage = async(_mes) => {
    try {
        for(let i = 0; i < wsMessageReceived.length ; i++){
            // console.log(wsMessageReceived[i])
            if(wsMessageReceived[i].includes(_mes)) return true
        }
        return false
    } catch (error) {
        return false
    }
}
const getMessage = async(_mes) => {
    try {
        if(typeof wsMessageReceived !== 'undefined'){
            const _found = wsMessageReceived.filter(element => element.includes(_mes));
            // console.log(_found)
            if(_found.length !== 0) return _found.pop();
        }
        return null
    } catch (error) {
        return null
    }
}

export const wsFindMessage = async(_mes) => {
    try {
        let result
        for(let t = 0 ; t< config.setting.loop ; t++){
            if(typeof wsMessageReceived !== 'undefined'){
                // console.log(wsMessageReceived)
                result = await FindMessage(_mes)
                if( result === true ) return { Val : true , Err : { IsErr : false , ErrMess : ""}}
                await sleep(1000)
            }
        }
        return { Val : false , Err : { IsErr : false , ErrMess : ""}}
    } catch (error) {
        return { Val : false , Err : { IsErr : true , ErrMess : "Error: "+ error.message}}
    } 
}
export const getWsMessage = async(_mes) => {
    try {
        let result
        for(let t = 0 ; t< config.setting.loop ; t++){
                // console.log(wsMessageReceived)
                result = await getMessage(_mes)
                if(result !== null ) return result
                await sleep(500)
            }
        return null
    } catch (error) {
        console.log(error.message)
        return null
    } 
}

// Wait for wsmsg
export const wsWaitMessage = async(_mes)=> {
    try {
        for(let t =0 ; t < config.setting.loop ; t++){
            let _found = wsMessageReceived.filter(element => element.includes(_mes));
            if (_found.length > 0) {
                break
                }
            else{ 
                await sleep(500) 
                }
            }             
        }
        catch (error){
            console.log('Error '+error.message)
        }
    
    }
   
// Check FreeSpin is existed
export const isFreeSpin = async() => {
    try {
        for(let t = 0 ; t< config.setting.loop ; t++){
            if(typeof wsMessageReceived !== 'undefined'){
                for(let i = 0; i < wsMessageReceived.length ; i++){
                    if(wsMessageReceived[i].includes('Authorized')) {
                        let chk = JSON.parse(wsMessageReceived[i])
                        if(typeof chk.user.availSpins === 'undefined' ) return false
                        else if(chk.user.availSpins != 0) return true
                        else return false
                    }
                }
            }
            await sleep(1000)
        }
        return false
    } catch (error) {
        console.log('Error '+error.message)
        return false
    }
}


// Go to Page
export const navigate = async(_url) => {
    try {
        await page.goto(_url, { timeout : config.setting.timeout})
        await page.waitForTimeout(500)
    } catch (error) {
        console.error(error.message)
    }
}


// Wait Page Load
export const waitForLoadState = async() => {
    try {
        await page.waitForLoadState('load', { timeout : config.setting.timeout })
     } catch (error) {
         console.error(error.message);
         // this.screenFail()
     }
}
// Wait For Navigation
export const waitForNavigation = async() => {
    try{
        await  page.waitForNavigation( {timeout : config.setting.timeout} )
    } catch (error) {
        console.error(error.message);
        // this.screenFail()
    }
}
// Wait Element 
export const waitEl = async(_el) => {
    try {
        await page.waitForSelector(_el, { timeout : config.setting.timeout})
     } catch (error) {
         console.error(error.message);
         // this.screenFail()
     }
}
// Click Element
export const clickEl = async(_el) => {
    try {
        await page.waitForSelector(_el, { timeout : config.setting.timeout })
        await page.click(_el)
        await page.waitForTimeout(500)
     } catch (error) {
         console.error(error.message);
         // this.screenFail()
     }
}

// Click Position
export const clickPos = async(_x, _y) => {
    try {
        await page.mouse.click(_x,_y)
        await page.waitForTimeout(500)
     } catch (error) {
         console.error(error.message);
         // this.screenFail()
     }
}

// Send message to Element
export const sendKeys = async(_el, _val) => {
    try {
        await page.waitForSelector(_el, { timeout : config.setting.timeout })
        await page.fill(_el, _val)
    } catch (error) {
        console.error(error.message);
        // this.screenFail()
    }
}

// Get value of Attribute
export const getAttribute = async(_el, _val) => {
    try {
        await page.waitForSelector(_el, { timeout : config.setting.timeout })
        return await page.getAttribute(_el, _val, { timeout : config.setting.timeout })
    } catch (error) {
        console.error(error.message);
        // this.screenFail()
    }
}

// Verify value of Attribute is not equal strCompare
export const isValueNotEqualOnAttribute = async(_el, _val, _strCompare) => {
    try {
        let loop = true;
        while(loop){
            if((await getAttribute(_el, _val)).toString() != _strCompare) return { Val : true , Err : { IsErr : false , ErrMess : ""}}
            setTimeout(() => { 
                loop = false
              }, setting.timeout);
        }
        return { Val : false , Err : { IsErr : false , ErrMess : ""}}
    } catch (error) {
        console.log('Error '+error.message)
        return { Val : false , Err : { IsErr : true , ErrMess : "Error: "+ error.message}}
    }
}

// Verify Title
export const verifyTitle = async(_title) => {
    try {
        await waitForLoadState()
        let _act_title = await page.title()
        if(_act_title == _title) return { Val : true , Err : { IsErr : false , ErrMess : ""}}
        return { Val : false , Err : { IsErr : false , ErrMess : ""}}
    }  catch (error) {
        console.log('Error '+error.message)
        return { Val : false , Err : { IsErr : true , ErrMess : "Error: "+ error.message}}
    }
}

// Select Dropdown List
export const selectDrp = async(_el, _val) => {
    try {
        await page.waitForSelector(
            _el, { state: 'attached'}
        )
        await page.selectOption(_el, { value : _val })
    }  catch (error) {
        console.log('Error '+error.message)
    }
}

// Clear Log Message
export const clearLog = async() =>{
    wsMessageReceived = []
}

// ScreenShot
export const screenShotFailed = async() => {
    try {
        await page.screenshot({ path: 'ScreenShot'+ path.sep +'Failed_Screen.png', type : "png" })
    }  catch (error) {
        console.log('Error '+error.message)
    }
}
export const screenShot = async(_title) => {
    try {
        await page.screenshot({ path: 'ScreenShot'+ path.sep +_title+'.png', type : "png" })
        
    } catch (error) {
        console.log('Error '+error.message)
    }
}

export const sleep = async(_milliseconds) => {
    try {
        await page.waitForTimeout(_milliseconds)
    } catch (error) {
        console.log('Error '+error.message)
    }
}

// Find Image
export const readImageData = async(_path) => {
    try {
        return PNG.sync.read(fs.readFileSync(_path))
    } catch (error) {
        console.log('Error '+error.message)
    }
}
export const CaptureSubImageToFile = async(_path,_x, _y , _w, _h) => {
    try {
        return (await page.screenshot({path: _path , clip : {x: _x, y: _y, width: _w, height : _h} }))
    } catch (error) {
        console.log('Error '+error.message)
    } 
}
export const findImage = async(_subimage, _x=null, _y=null, _w=null, _h=null) => {
    /* Test Comment*/
    try {
        if(typeof _subimage === 'object'){
            _x = _subimage.left
            _y = _subimage.top
            _w = _subimage.width
            _h = _subimage.height
            _subimage = _subimage.ImageCompare
        } else if(isNaN(_x) === false){}
        else {
            _y = _x.top
            _w = _x.width
            _h = _x.height
            _x = _x.left
        }
        let flag=null
        let si = readImageData(_subimage)
        let sc
        let diff = new PNG({_w, _h});
        let loop =true;
        while(loop){
            sc = PNG.sync.read(await page.screenshot({ clip : {x: _x, y: _y, width: _w, height : _h} }))
            flag = pixelmatch((await si).data,sc.data, diff.data, _w, _h, { threshold : 0.15 })
            // console.log(Date.now())
            // console.log('a_pixeldiff:'+flag.toString())
            // console.log('e_pixelmatch'+(_w*_h*0.07).toString())
            if(flag<(_w*_h*0.07)) return { Val : true , Err : { IsErr : false , ErrMess : ""}}
            setTimeout(() => { 
                loop = false
                }, config.setting.timeout);
            // fs.writeFileSync('diff.png', PNG.sync.write(diff));
        }
        return { Val : false , Err : { IsErr : false , ErrMess : ""}}
    } catch (error) {
        console.log('Error '+error.message)
        return { Val : false , Err : { IsErr : true , ErrMess : "Error: "+ error.message}}
    }
}

export const imageShouldNotDisplay = async(_subimage, _x=null, _y=null, _w=null, _h=null) => {
    /* Test Comment*/
    try {
        if(typeof _subimage === 'object'){
            _x = _subimage.left
            _y = _subimage.top
            _w = _subimage.width
            _h = _subimage.height
            _subimage = _subimage.ImageCompare
        } else if(isNaN(_x) === false){}
        else {
            _y = _x.top
            _w = _x.width
            _h = _x.height
            _x = _x.left
        }
        let flag=null
        let si = readImageData(_subimage)
        let sc
        let diff = new PNG({_w, _h});
        let loop =true;
        while(loop){
            sc = PNG.sync.read(await page.screenshot({ clip : {x: _x, y: _y, width: _w, height : _h} }))
            flag = pixelmatch((await si).data,sc.data, diff.data, _w, _h, { threshold : 0.15 })
            // console.log(Date.now())
            // console.log('a_pixeldiff:'+flag.toString())
            // console.log('e_pixelmatch'+(_w*_h*0.6).toString())
            if(flag>(_w*_h*0.6)) return { Val : true , Err : { IsErr : false , ErrMess : ""}}
            setTimeout(() => { 
                loop = false
              }, config.setting.timeout);
            // fs.writeFileSync('diff.png', PNG.sync.write(diff));
        }
        return { Val : false , Err : { IsErr : false , ErrMess : ""}}
    } catch (error) {
        console.log('Error '+error.message)
        return { Val : false , Err : { IsErr : true , ErrMess : "Error: "+ error.message}}
    }
}

// parse text from image
export const getTextFromImage = async(_path) => {
    try {
        const worker = createWorker()
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize(_path);
        // console.log(text)
        await worker.terminate();
        return text
    } catch (error) {
        console.log('Error '+error.message)
    }
}

// Parse text to Number
export const parseNumber = async(_text) => {
    try {

        let txtNum = _text.replace(/[\$US\,]/g,'').replace(/\.([0-9]{3})/g,'$1').trim()
        // console.log('parse: '+txtNum)
        return parseFloat(txtNum)
    } catch (error) {
        console.log('Error '+error.message)
    }
}

// swipe to left ( y < 0 ) or right ( y >0 )
export const swipe = async(__fx, _fy,__tx, _ty,) => {
    try {
        await page.mouse.move(__fx,  _fy)
        await page.mouse.down();
        await sleep(500)
        await page.mouse.move(__tx,  _ty)
        await sleep(1000)
        await page.mouse.up()
    } catch (error) {
        console.log('Error '+error.message)
    }
}


// Place bet until get message
export const verifyWsMessageForBetProcess = async(_mes) => {
    try {
        let result
        for(let t = 0 ; t< 4 ; t++){
            if(typeof wsMessageReceived !== 'undefined'){
                if( await FindMessage(_mes) === true ) {
                    return true
                }
                else if(await FindMessage('endBet') === true && result === false) {
                    return false
                }
            }
            await page.waitForTimeout(500)
        }
        return false
    }  catch (error) {
        console.log('Error '+error.message)
        return false
    }
}
export const betProcess = async(_x,_y,_mes) => {
    try{
        for(let t = 0; t< config.setting.loop; t++){
            await clickPos(_x,_y)
            if(await verifyWsMessageForBetProcess(_mes) === true) {
                return { Val : true , Err : { IsErr : false , ErrMess : ""}}
            }
            await page.waitForTimeout(1000)
        }
        return { Val : false , Err : { IsErr : false , ErrMess : ""}}
    } catch (error) {
        console.log('Error '+error.message)
        return { Val : false , Err : { IsErr : true , ErrMess : "Error: "+ error.message}}
    }
}


// Check Websocket Mesage
export const wshear = async(ws) =>{
    if(isHear ===true) {
        ws.on('framereceived', async msg => {
            if(isHear ===true) {
                wsMessageReceived.push(msg.payload)
            } 
            // else { wsMessageReceived = [] }
        });
    }
}

// Open Listener Websocket Message
export const wsHearMessageOn = async() => {
    isHear = true
    page.on('websocket', async ws => wshear(ws))
    
}

// Off Listener Websocket Message
export const wsHearMessageOff = async() => {
    isHear = false
}

// Off Listener Websocket Message
export const shouldBeEqual = async(_val,_expect,_mess="") => {
    global.expect(_val,_mess).to.equal(_expect) 
}
export const notify = async(_status)=>{
    const args = await parseArg(process.argv[7])
    // let runtime = new Date().toLocaleDateString()  + "   " + new Date().toLocaleTimeString()
    // Send Telegram if Failed
    if(_status === false){
        let res = await chai.request("https://bot.nexdev.net")
        .post("/skynex/api/messages/forwardwithtoken").set('content-type', 'application/x-www-form-urlencoded')
        .send({
            token: "0A40aOc7CtpzjbBSJu8KNWQRoXyjRvf9",
            conversationId: -1001373563170,
            message: `*「Check Login SC2」*..:rocket:{{NewLine}}:no_entry_sign:*FAILED ${msg}*:no_entry_sign: - [Picture](https://git3.nexdev.net/RnD/testing/bot-login-sc2/-/jobs/${args.Job}/artifacts/file/Report/Pictures/Verify%20SSO%20succesfully%20on%20PRO.png){{NewLine}}Refer [log](https://git3.nexdev.net/RnD/testing/bot-login-sc2/-/jobs/${args.Job}){{NewLine}}Duration time over ${t} seconds{{NewLine}}____________________`
        })
        await shouldBeEqual(res.statusCode,200)
    }
}
// Wait Page Load
export const ReturnFlag = async() => {
    try {
        for(let t =0 ; t < config.setting.loop ; t++){
            if(page.url().toString().includes('lang=vn') === true) {
                return true
            }
            await sleep(200)
        }     
        return false
     } catch (error) {
         // this.screenFail()
         return false
     }
}
export const checkNetwork = async() => {
    let res = await chai.request("http://www.athena-demo-online.com").get("/onelogin.aspx?id=supper").send()
    return (res.statusCode === 200) ? true : false
}
export const logOut = async()=> {
    await context.clearCookies()
}
// Login
export const Login = async(_env,_game) => {
    let flag
    let starttime,endtime
    // Login Member Site
    await MemberSiteFunc.login(_env,_game)
    await waitForLoadState()
    flagLogMemberSite = await ReturnFlag()
    if(flagLogMemberSite === false){
        if(attempt === 1){
            attempt = 2
            return false
        } else {
            msg = "Login Member Site" 
            await notify(false)
            await shouldBeEqual(true,false,"Failed on Login Member Site")
            return false
        }
    }
    await navigate(config[_env].gamelobbyurl)
    //select group currency
    await selectDrp('xpath=//*/select[@id="group"]','61cbfc0baae6220001d073e9')
    await clickEl('xpath=//input[@value="Submit"]')
    await sleep(9000)
    // await waitEl(MemberSiteLocator.frmMainFrame)
    // await navigate(await getAttribute(MemberSiteLocator.frmMainFrame,'src'))
    // Verify go to Game Lobby Successfully
    starttime = Date.now()
    flag = await GameLobbyFunc.verifyLoginSuccessfully()
    endtime = Date.now()
    t = Math.round((endtime - starttime)/1000)
    console.log('Duration to SSO : (' + (endtime - starttime) +'ms)')

    if(flag.Val === false){
        if(attempt === 1){
            attempt = 2
            return false
        } else {
            msg = `SSO = account ${config.cf_prod.username.Gamelobby2}`
            await notify(false)
            await shouldBeEqual(true,false,"Fail on SSO = account ${}")
            return false
        }
    }
    return true
}


export const parseArg = async(_args)=> {
    let p = _args.split("-")
    let args ={},tmp=[]
    for(let i=0 ; i< p.length ; i++){
        tmp = p[i].split("=")
        args[tmp[0]] = tmp[1]
    }
    return args
}
