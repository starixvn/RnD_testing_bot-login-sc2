export const setting ={
     browser: 'chromium',
     viewport: {
        // UI
        width : 1280,
        height : 720
    },
    timeout : 90000,
    loop : 90,
    headless: true

}

export const cf_local ={
    url: "http://gamelobby-simulator.lumigame.com/signin",
    username: "",
    memberId: {
        BlackJack : "1001051",
        Sedie : "1001052",
        Sicbo:  "1001053",
        Keno:  "1001054",
        Baccarat:  "1001055",
        Roulette:  "1001056"
    },
    password: "",
    gamelobbyurl: ""
}

export const cf_sit ={
    url: "http://demo:one23@qawer.playthefun.com:5068/login",
    username: "supertestsaba48",
    password: "1234aaAA",
    gamelobbyurl: "http://qawer.playthefun.com:5068/VendorGame/OpenSabaClubLobby"
}

export const cf_uat ={
    url: "http://demo:one23@qawer.viva88.com:6100/Login/",
    username: "IT57Test789",
    password: "1234aaAA",
    gamelobbyurl: "http://qawer.viva88.com:6100/VendorGame/OpenSabaClubLobby"
}


export const cf_prod ={
    url: "http://www.athena-demo-online.com/onelogin.aspx?id=supper",
    username: {
       Gamelobby: "VNtest042" 
    },
    password: "1q2w3e4r",
    gamelobbyurl: "http://member.athena-demo-online.com/GamePage.aspx?Game=sabaclub&refer="
}
