Ti.include("./GameManager.js");
Titanium.UI.setBackgroundColor('#000');

var tabGroup = Titanium.UI.createTabGroup();

var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'VS JOGADOR',
    window:win1
});

var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});

var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'VS CPU (FÁCIL)',
    window:win2
});

var gameManager = new GameManager(win1, win2);
gameManager.Start();

tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);
tab1.addEventListener('blur', Change , false); 
tab2.addEventListener('blur', Change , false);

function Change(e)
{
	if(e.tab != null)
	{
		gameManager.ChangeTab(e.tab.title);
	}
}

tabGroup.open();
