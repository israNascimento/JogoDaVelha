/**
 * @author Israel
 */
Ti.include("./AIManager.js");

var PlayerManager = function(board, player2, window)
{
	this.currentPlayer = "X";
	this.xWins = 0;
	this.oWins = 0;
	this.hasWin = false;
	this.aiManager = new AIManager(board, player2);
	this.window = window;
	
		
	this.labelX = Titanium.UI.createLabel({
		color:'#000000',
		text:'Vitórias X: ',
		font:{fontSize:30,fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:'auto',
		bottom: 80
	});
	
	this.labelO = Titanium.UI.createLabel({
		color:'#000000',
		text:'Vitórias O: ',
		font:{fontSize:30,fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:'auto',
		bottom: 40
	});
		
	this.ChangePlayer = function()
	{
		if(board.countButtonChecked >= 5)
			board.CheckWin();
		
		if(this.currentPlayer == "X")
			this.currentPlayer = "O";
		else
			this.currentPlayer = "X";
			
		if(player2 != "Player" && this.currentPlayer == "O" && !this.hasWin)
		{
			this.aiManager.RedirectToNivelFunction(player2);
		}
	};
	
	this.GetWinner = function()
	{
		if(this.currentPlayer == "X")
		{
			if(player2 == "Player")
			{
				this.oWins++;
			}
			else
			{
				if(this.xWins >= Titanium.App.Properties.getInt("BestScore"+player2))
				{
					Titanium.App.Properties.setInt("BestScore"+player2, this.xWins);
				}			
				this.xWins = 0;
			}
		}
		else
		{
			this.xWins++;
		}
		
		this.UpdateLabels();
		board.Reset();
	};
	
	this.UpdateLabels = function()
	{
		this.window.add(this.labelX);
		this.window.add(this.labelO);
			
		if(player2 == "Player")
		{
			this.labelX.text = "Vitórias X: "+this.xWins;
			this.labelO.text = "Vitórias O: "+this.oWins;
		}
		else
		{
			this.labelX.text = "Vitórias: "+this.xWins;
			this.labelO.text = "Recorde: "+Titanium.App.Properties.getInt("BestScore"+player2);
		}
	};
};
