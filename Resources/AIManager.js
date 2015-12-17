/**
 * @author Israel
 */

var AIManager = function(board)
{
	this.hasTwoEquals = false;

	this.RedirectToNivelFunction = function(nivel)
	{
		switch(nivel)
		{
			case "Easy": this.GetEasyMove();
			break;
			case "Hard": this.GetHardMove();
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
	
	this.GetHardMove = function()
	{
		this.xPar = 0;
		this.yPar = 0;
		for(var i = 0; i<board.GetWinsPossibilitys().length; i++)
		{
			if(this.GetTwoNumberEquals(board.GetWinsPossibilitys()[i]) != null)
			{
				if(board.GetWinsPossibilitys()[i][0].title === "O" || board.GetWinsPossibilitys()[i][1].title === "O" || board.GetWinsPossibilitys()[i][2].title === "O")
				{
					this.hasTwoEquals = true;
			
					this.xPar = parseInt(board.GetWinsPossibilitys()[i][this.GetTwoNumberEquals(board.GetWinsPossibilitys()[i])].titleid.substring(0, 1));
					this.yPar = parseInt(board.GetWinsPossibilitys()[i][this.GetTwoNumberEquals(board.GetWinsPossibilitys()[i])].titleid.substring(1, 2));			
					//this.DoMovement(this.xPar, this.yPar);
					break;	
				}
				else
				{
					
					this.hasTwoEquals = true;
					this.xPar = parseInt(board.GetWinsPossibilitys()[i][this.GetTwoNumberEquals(board.GetWinsPossibilitys()[i])].titleid.substring(0, 1));
					this.yPar = parseInt(board.GetWinsPossibilitys()[i][this.GetTwoNumberEquals(board.GetWinsPossibilitys()[i])].titleid.substring(1, 2));
					continue;
				}
			}
		}
		
		if(this.hasTwoEquals)
		{
			this.DoMovement(this.xPar, this.yPar);
			Titanium.API.info("X: "+this.xPar+" Y: "+this.yPar);
			this.hasTwoEquals = false;
		}
		else
		{
			this.GetEasyMove();
		}
	};
	
	this.DoMovement = function(x, y)
	{
		board.ButtonClick(x, y, board.playerManager.currentPlayer);
		board.countButtonChecked++;
		board.playerManager.ChangePlayer();
	};
	
	
	this.GetTwoNumberEquals  = function(array)
	{
        if(array[0].title == array[1].title && array[0].title != "" && array[1].title != "" && array[2].title === "")
        {
       		return 2;
   		}
   		if(array[0].title == array[2].title && array[0].title != "" && array[2].title != "" && array[1].title === "")
   		{
   			return 1;
   		}
   		if(array[1].title == array[2].title && array[1].title != "" && array[2].title != "" && array[0].title === "")
   		{
   			return 0;
   		}
   		return null;
   		
	};
};
