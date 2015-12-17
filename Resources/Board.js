/**
 * @author Israel
 */

Ti.include("./PlayerManager.js");

var Board = function(window, gameManager, player2)
{
	this.btn_array = new Array();
	this.gameManager = gameManager;
	this.playerManager = new PlayerManager(this, player2, window);
	this.countButtonChecked = 0;
	
	this.CreateBoard = function()
	{
		var btn_w = 75;
		var btn_h = 100;
		
		for(var i = 0; i<3; i++)
		{
			this.btn_array[i] = new Array();
			for(var j = 0; j<3; j++)
			{
				this.but = Titanium.UI.createButton({
					title: "",
					width: btn_w,
					height: btn_h,
					left: (window.rect.width/2 + 1*btn_w)+btn_w*i,
					top: (window.rect.height/2+30)+btn_h*j,
					color: '#000000',
					font:{fontSize: 25, fontWeight: "bold" }
				});
				this.btn_array[i].push(this.but);
				window.add(this.btn_array[i][j]);
			    this.btn_array[i][j].addEventListener('click', this.ButtonClickDelegate(i, j), false);
	    	}
		}
	};
	
	//Quando é passada a função ButtonClick, ao invés de adicionar os paramêtros certos de cada botão, é adicionado o valor máximo do loop.
	this.ButtonClickDelegate = function(a, b) 
	{
	  return function()
	  {
	 		gameManager.CallClickButton(a, b);	      
	  };
	};

	this.ButtonClick = function(x, y, currentPlayer)
	{
		this.btn_array[x][y].title = currentPlayer;
		this.btn_array[x][y].setEnabled(false);
	};
	
	this.isButtonChecked = function(x, y)
	{
		if(this.btn_array[x][y].title != "")
		{
			return true;
		}
		else
		return false;
	};
	
	this.CheckWin = function()
	{
		this.winsPossibility = [[this.btn_array[0][0], this.btn_array[0][1], this.btn_array[0][2]], 
						        [this.btn_array[1][0], this.btn_array[1][1], this.btn_array[1][2]],
						        [this.btn_array[2][0], this.btn_array[2][1], this.btn_array[2][2]],
						        [this.btn_array[0][0], this.btn_array[1][0], this.btn_array[2][0]], 
						        [this.btn_array[0][1], this.btn_array[1][1], this.btn_array[2][1]],
						        [this.btn_array[0][2], this.btn_array[1][2], this.btn_array[2][2]],
						        [this.btn_array[0][0], this.btn_array[1][1], this.btn_array[2][2]], 
						        [this.btn_array[0][2], this.btn_array[1][1], this.btn_array[2][0]]];
			
		for(var i = 0; i<this.winsPossibility.length; i++)
		{
			if(this.IsArrayEqual(this.winsPossibility[i]))
			{
				this.Highlight(this.winsPossibility[i]);
				this.playerManager.hasWin = true;
				
				var toast = Ti.UI.createNotification({
					message: "Jogador "+this.playerManager.currentPlayer+" Ganhou",
				    duration: Ti.UI.NOTIFICATION_DURATION_SHORT
				});	
				toast.show();
				break;
			}
		}
		
		if(this.countButtonChecked >= 9 && !this.playerManager.hasWin)
		{
			var toast = Ti.UI.createNotification({
				message: "Empatou",
			    duration: Ti.UI.NOTIFICATION_DURATION_SHORT
			});
			toast.show();
			this.Reset();
		}
	};
	
	this.IsArrayEqual = function(array)
	{
	    for(var i = 1; i < array.length; i++)
	    {
	        if(array[i].title != array[0].title || !this.hasTitle(array))
	            return false;
	    }
	    return true;
	};
	
	this.hasTitle = function(array)
	{
		for(var i = 0; i < array.length; i++)
	    {
	        if(array[i].title == null || array[i].title == "")
	            return false;
	    }
	    return true;
	};
	
	
	this.Highlight = function(array)
	{
		for(var i = 0; i<array.length; i++)
		{
			array[i].color = '#ff0000';
		}
		
		for(var  i = 0; i<3; i++)
		{
			for(var j = 0; j<3; j++)
			{
				this.btn_array[i][j].setEnabled(false);
			}
		}
		setTimeout(this.playerManager.GetWinner.bind(this.playerManager), 1500);
	};
	
	this.Reset = function()
	{
		for(var i = 0; i<3; i++)
		{
			for(var j = 0; j<3; j++)
			{
				this.btn_array[i][j].title = "";
				this.btn_array[i][j].color = "#000000";
				this.btn_array[i][j].setEnabled(true);
			}
		}

		this.countButtonChecked = 0;
		this.playerManager.hasWin = false;
		this.playerManager.currentPlayer = "X";		
	};
};
