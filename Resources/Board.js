/**
 * @author Israel
 */

var Board = function(window, gameManager)
{
	this.btn_array = new Array();
	this.gameManager = gameManager;
	
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
					top: (window.rect.height/2 + 1*btn_h)+btn_h*j,
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
	  	
		Ti.API.info("TO NO ANONYMOUS FUNCTION");
	  		gameManager.CallClickButton(a, b);	      
	  };
	};
	
	this.ButtonClick = function(x, y, currentPlayer)
	{
		this.btn_array[x][y].title = currentPlayer;
		this.btn_array[x][y].setEnabled(false);
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
				gameManager.hasWin = true;
				
				var toast = Ti.UI.createNotification({
					message: "Jogador "+gameManager.currentPlayer+" Ganhou",
				    duration: Ti.UI.NOTIFICATION_DURATION_SHORT
				});	
				toast.show();
				break;
			}
		}
		
		if(gameManager.countButtonChecked == 9 && !gameManager.hasWin)
		{
			var toast = Ti.UI.createNotification({
				message: "Empatou",
			    duration: Ti.UI.NOTIFICATION_DURATION_SHORT
			});
			toast.show();
			this.Reset();
			//setTimeout(function() {  }, 1500);
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
	//	gameManager.GetWinner();
		setTimeout(function() { gameManager.GetWinner(); }, 1500); //Se botar sem o anonymous function, o board do gameManager fica undefinied
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
				gameManager.countButtonChecked = 0;
				gameManager.hasWin = false;
			}
		}
	};
};
