// this sets the background color of the master UIView (when there are no windows/tab groups on it)

//TODO Orientação a objetos
Titanium.UI.setBackgroundColor('#000');

var win1 = Titanium.UI.createWindow({  
	fullscreen: false,
	navBarHidden: true,
    backgroundColor:'#fff'
});


var btn_array = new Array();
var currentPlayer = "X";
var xWins = 0;
var oWins = 0;
var countButtonChecked = 0;

CreateButton();

var labelX = Titanium.UI.createLabel({
	color:'#000000',
	text:'Vitórias X: ',
	font:{fontSize:30,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto',
	bottom: 80
});

var labelO = Titanium.UI.createLabel({
	color:'#000000',
	text:'Vitórias O: ',
	font:{fontSize:30,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto',
	bottom: 40
});

function CreateButton()
{
	var btn_w = 75;
	var btn_h = 100;
	
	for(var i = 0; i<3; i++)
	{
		btn_array[i] = new Array();
		for(var j = 0; j<3; j++)
		{
			var but = Titanium.UI.createButton({
				title: "",
				width: btn_w,
				height: btn_h,
				left: (win1.rect.width/2 + 1*btn_w)+btn_w*i,
				top: (win1.rect.height/2 + 1*btn_h)+btn_h*j,
				color: '#000000',
				font:{fontSize: 25, fontWeight: "bold" }
			});
			
			btn_array[i].push(but);
			win1.add(btn_array[i][j]);
		    btn_array[i][j].addEventListener('click', ButtonClickDelegate(i, j), false);
    	}
	}
}

//Quando é passada a função ButtonClick, ao invés de adicionar os paramêtros certos de cada botão, é adicionado o valor máximo do loop.
function ButtonClickDelegate(a, b) {
  return function(){
      ButtonClick(a, b);
  };
}

function ButtonClick(x, y)
{
	btn_array[x][y].title = currentPlayer;
	btn_array[x][y].setEnabled(false);
	countButtonChecked++;
	ChangePlayer();
}

function ChangePlayer()
{
	if(countButtonChecked >= 5)
	{
		CheckWin();
	}

	if(currentPlayer == "X")
	{
		currentPlayer = "O";
	}
	else
	{
		currentPlayer = "X";
	}
}

function CheckWin()
{
	var winsPossibility = [[btn_array[0][0], btn_array[0][1], btn_array[0][2]], 
					       [btn_array[1][0], btn_array[1][1], btn_array[1][2]],
					       [btn_array[2][0], btn_array[2][1], btn_array[2][2]],
					       [btn_array[0][0], btn_array[1][0], btn_array[2][0]], 
					       [btn_array[0][1], btn_array[1][1], btn_array[2][1]],
					       [btn_array[0][2], btn_array[1][2], btn_array[2][2]],
					       [btn_array[0][0], btn_array[1][1], btn_array[2][2]], 
					       [btn_array[0][2], btn_array[1][1], btn_array[2][0]]];
			
	for(var i = 0; i<winsPossibility.length; i++)
	{
		if(IsArrayEqual(winsPossibility[i]))
		{
			Highlight(winsPossibility[i]);
			
			var toast = Ti.UI.createNotification({
				message: "Jogador "+currentPlayer+" Ganhou",
			    duration: Ti.UI.NOTIFICATION_DURATION_SHORT
			});	
			toast.show();
			break;
		}
	}
	
	if(countButtonChecked == 9)
	{
		var toast = Ti.UI.createNotification({
			message: "Empatou",
		    duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
		setTimeout(Reset, 1500);
	}
}

function Highlight(array)
{
	for(var i = 0; i<array.length; i++)
	{
		Ti.API.info("CHAME HIGHLIGHT");
		array[i].color = '#ff0000';
	}
	
	for(var  i = 0; i<3; i++)
	{
		for(var j = 0; j<3; j++)
		{
			btn_array[i][j].setEnabled(false);
		}
	}
	setTimeout(GetWinner, 1500);
}

function GetWinner()
{
	
	Ti.API.info("get winner");
	if(currentPlayer == "X")
	{
		oWins++;
		labelO.text = "Vitórias O: "+oWins;
	}
	
	else
	{
		xWins++;
		labelX.text = "Vitórias X: "+xWins;
	}

	Reset();
}


function IsArrayEqual(array)
{
    for(var i = 1; i < array.length; i++)
    {
        if(array[i].title != array[0].title || !IsTitlesSet(array))
            return false;
    }
    return true;
}

function IsTitlesSet(array)
{
    for(var i = 0; i < array.length; i++)
    {
        if(array[i].title == null || array[i].title == "")
            return false;
    }
    return true;
}

function Reset()
{
	for(var i = 0; i<3; i++)
	{
		for(var j = 0; j<3; j++)
		{
			btn_array[i][j].title = "";
			btn_array[i][j].color = "#000000";
			btn_array[i][j].setEnabled(true);
			countButtonChecked = 0;
		}
	}
}


win1.add(labelX);

win1.add(labelO);
win1.open();