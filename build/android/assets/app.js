function CreateButton(){for(var t=75,r=100,a=0;3>a;a++){btn_array[a]=new Array;for(var n=0;3>n;n++){var e=Titanium.UI.createButton({title:"",width:t,height:r,left:win1.rect.width/2+1*t+t*a,top:win1.rect.height/2+1*r+r*n,color:"#000000",font:{fontSize:25,fontWeight:"bold"}});btn_array[a].push(e),win1.add(btn_array[a][n]),btn_array[a][n].addEventListener("click",ButtonClickDelegate(a,n),!1)}}}function ButtonClickDelegate(t,r){return function(){ButtonClick(t,r)}}function ButtonClick(t,r){btn_array[t][r].title=currentPlayer,btn_array[t][r].setEnabled(!1),countButtonChecked++,ChangePlayer()}function ChangePlayer(){countButtonChecked>=5&&CheckWin(),currentPlayer="X"==currentPlayer?"O":"X"}function CheckWin(){for(var t=[[btn_array[0][0],btn_array[0][1],btn_array[0][2]],[btn_array[1][0],btn_array[1][1],btn_array[1][2]],[btn_array[2][0],btn_array[2][1],btn_array[2][2]],[btn_array[0][0],btn_array[1][0],btn_array[2][0]],[btn_array[0][1],btn_array[1][1],btn_array[2][1]],[btn_array[0][2],btn_array[1][2],btn_array[2][2]],[btn_array[0][0],btn_array[1][1],btn_array[2][2]],[btn_array[0][2],btn_array[1][1],btn_array[2][0]]],r=0;r<t.length;r++)if(IsArrayEqual(t[r])){Highlight(t[r]);var a=Ti.UI.createNotification({message:"Jogador "+currentPlayer+" Ganhou",duration:Ti.UI.NOTIFICATION_DURATION_SHORT});a.show();break}if(9==countButtonChecked){var a=Ti.UI.createNotification({message:"Empatou",duration:Ti.UI.NOTIFICATION_DURATION_SHORT});a.show(),setTimeout(Reset,1500)}}function Highlight(t){for(var r=0;r<t.length;r++)Ti.API.info("CHAME HIGHLIGHT"),t[r].color="#ff0000";for(var r=0;3>r;r++)for(var a=0;3>a;a++)btn_array[r][a].setEnabled(!1);setTimeout(GetWinner,1500)}function GetWinner(){Ti.API.info("get winner"),"X"==currentPlayer?(oWins++,labelO.text="Vitórias O: "+oWins):(xWins++,labelX.text="Vitórias X: "+xWins),Reset()}function IsArrayEqual(t){for(var r=1;r<t.length;r++)if(t[r].title!=t[0].title||!IsTitlesSet(t))return!1;return!0}function IsTitlesSet(t){for(var r=0;r<t.length;r++)if(null==t[r].title||""==t[r].title)return!1;return!0}function Reset(){for(var t=0;3>t;t++)for(var r=0;3>r;r++)btn_array[t][r].title="",btn_array[t][r].color="#000000",btn_array[t][r].setEnabled(!0),countButtonChecked=0}Titanium.UI.setBackgroundColor("#000");var win1=Titanium.UI.createWindow({fullscreen:!1,navBarHidden:!0,backgroundColor:"#fff"}),btn_array=new Array,currentPlayer="X",xWins=0,oWins=0,countButtonChecked=0;CreateButton();var labelX=Titanium.UI.createLabel({color:"#000000",text:"Vitórias X: ",font:{fontSize:30,fontFamily:"Helvetica Neue"},textAlign:"center",width:"auto",bottom:80}),labelO=Titanium.UI.createLabel({color:"#000000",text:"Vitórias O: ",font:{fontSize:30,fontFamily:"Helvetica Neue"},textAlign:"center",width:"auto",bottom:40});win1.add(labelX),win1.add(labelO),win1.open();