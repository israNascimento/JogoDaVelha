// this sets the background color of the master UIView (when there are no windows/tab groups on it)

//TODO Orientação a objetos

Ti.include("./Board.js");
Ti.include("./GameManager.js");

Titanium.UI.setBackgroundColor('#000');
var win1 = Titanium.UI.createWindow({  
	fullscreen: false,
	navBarHidden: true,
    backgroundColor:'#fff'
});

var gameManager = new GameManager(win1);
gameManager.Start();

win1.open();