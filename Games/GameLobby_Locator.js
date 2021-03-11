const path = require('path') 
const pathImageCompare = path.join(__dirname,"../") + path.sep + "ImageCompare" + path.sep 
export const GameLobbyLocator = { 
	cvGame : "GameCanvas",
	AccountName : { top : 4, left : 457, width : 85, height : 51, ImageCompare : pathImageCompare + "ImgCompare_GameLobby_AccountName.png" },
	Balance : { top : 19, left : 755, width : 175, height : 28, ImageCompare : pathImageCompare + "ImgCompare_GameLobby_Balance.png" },
	FourGuardiansIcon : { x : 313, y : 359 },
	VipSedieIcon : { x : 494, y : 275 },
	SedieIcon : { x : 496, y : 447 },
	SedieWarIcon : { x : 667, y : 276 },
	MiniSedieIcon : { x : 669, y : 446 },
	BigSmallSicboIcon : { x : 842, y : 276 },
	BigSmallIcon : { x : 844, y : 447 },
	TurboBigSmallIcon : { x : 1016, y : 274 },
	TurboOddEvenIcon : { x : 1015, y : 451 },
	KenoProMaxIcon : { x : 1187, y : 275 },
	KenoProVietIcon : { x : 1187, y : 447 },
	VipBaccaratIcon : { x : 670, y : 272 },
	BaccaratIcon : { x : 671, y : 449 },
	VipFishPrawnCrabIcon : { x : 842, y : 274 },
	FishPrawnCrabIcon : { x : 838, y : 445 },
	DragonTigerIcon : { x : 1013, y : 271 },
	BlackJackIcon : { x : 1187, y : 274 },
	RouletteIcon : { x : 1185, y : 447 }
}