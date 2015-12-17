Ti.include("./GameManager.js");
Titanium.UI.setBackgroundColor('#000');

var tabGroup = Titanium.UI.createTabGroup();

var win1 = Titanium.UI.createWindow({  
    title:'VS JOGADOR',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'VS JOGADOR',
    window:win1
});

var win2 = Titanium.UI.createWindow({  
    title:'VS CPU (FÁCIL)',
    backgroundColor:'#fff'
});

var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'VS CPU (FÁCIL)',
    window:win2
});

var win3 = Titanium.UI.createWindow({  
    title:'VS CPU (DIFÍCIL)',
    backgroundColor:'#fff'
});

var tab3 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'VS CPU (DIFÍCIL)',
    window:win3
});

var gameManager = new GameManager(win1, win2, win3);
gameManager.Start();

tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
tab1.addEventListener('blur', Change , false); 
tab2.addEventListener('blur', Change , false); 
tab3.addEventListener('blur', Change , false);


function Change(e)
{
	if(e.tab != null)
	{
		gameManager.ChangeTab(e.tab.title);
	}
}

tabGroup.open();
