/**
 * @author Israel
 */
Ti.include("./Board.js");

var GameManager = function(window)
{
	this.board = new Board(window, this);
	this.currentPlayer = "X";
	this.countButtonChecked = 0;
	this.xWins = 0;
	this.oWins = 0;
	this.hasWin = false;
	
	
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

	
	this.Start = function()
	{
		this.board.CreateBoard();
		window.add(this.labelO);
		window.add(this.labelX);
	};
	
	this.CallClickButton= function(x, y)
	{
		this.board.ButtonClick(x, y, this.currentPlayer);
		this.countButtonChecked++;
		this.ChangePlayer();
	};
	
	this.ChangePlayer = function()
	{
		if(this.countButtonChecked >= 5)
			this.board.CheckWin();
		
		if(this.currentPlayer == "X")
			this.currentPlayer = "O";
		else
			this.currentPlayer = "X";
			
			
	//-----------------------------------------------------------------------------+-
	//	Ti.API.info("Board IN change: "+this.board+" Reset: ");
	};
	
	this.GetWinner = function()
	{
		if(this.currentPlayer == "X")
		{
			this.oWins++;
			this.labelO.text = "Vitórias O: "+this.oWins;
		}
		
		else
		{
			this.xWins++;
			this.labelX.text = "Vitórias X: "+this.xWins;
		}
		
	//-----------------------------------------------------------------------------+-
		Ti.API.info("Board: "+this.board+" Reset: "+this.board.Reset());
		this.board.Reset();
	};
};
