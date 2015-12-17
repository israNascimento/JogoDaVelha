/**
 * @author Israel
 */
Ti.include("./Board.js");

var GameManager = function(pvp, easy, medium, hard)
{
	this.boardPvp    = new Board(pvp, this, "Player");
	this.boardEasy   = new Board(easy, this, "Easy");
	this.currentBoard = this.boardPvp;
	this.countButtonChecked = 0;
	
	this.Start = function()
	{
		this.boardPvp.CreateBoard();
		this.boardEasy.CreateBoard();
		
		this.boardPvp.playerManager.UpdateLabels();
		this.boardEasy.playerManager.UpdateLabels();
		
		if(Titanium.App.Properties.getInt("BestScoreEasy") == null)
		{
			Titanium.App.Properties.setInt("BestScoreEasy", 0);
		}
	};
	
	this.ChangeTab = function(name)
	{
		switch(name)
		{
			case "VS JOGADOR": this.currentBoard = this.boardPvp;
			break;
			case "VS CPU (FÁCIL)": this.currentBoard = this.boardEasy;
			break;
		}
		this.currentBoard.playerManager.UpdateLabels();
	};
	
	this.CallClickButton= function(x, y) // "Object #<Button> has no method 'CallclickButton'"
	{
		this.currentBoard.ButtonClick(x, y, this.currentBoard.playerManager.currentPlayer);
		this.currentBoard.countButtonChecked++;
		this.currentBoard.playerManager.ChangePlayer();
	};
};
