/**
 * @author Israel
 */

var AIManager = function(board)
{
	this.RedirectToNivelFunction = function(nivel)
	{
		switch(nivel)
		{
			case "Easy": this.GetEasyMove();
			break;
			case "Medium": this.GetEasyMove();
			break;
			case "Hard": this.GetEasyMove();
			break;
		}	
	};
	
	this.GetEasyMove = function()
	{
		this.x = Math.floor(Math.random()*3);
		this.y = Math.floor(Math.random()*3);
		while(board.isButtonChecked(this.x, this.y))
		{
			this.x = Math.floor(Math.random()*3);
			this.y = Math.floor(Math.random()*3);
		}
		board.ButtonClick(this.x, this.y, board.playerManager.currentPlayer);
		board.countButtonChecked++;
		board.playerManager.ChangePlayer();	
	};
};
