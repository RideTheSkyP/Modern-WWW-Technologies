var context = document.getElementById("puzzle").getContext("2d");

var img = new Image();
img.src = "resources/img4.jpg";

function setImage(imgStr)
{
	img.src = "resources/" + imgStr
	setBoard();
	drawTiles();
}

img.addEventListener("load", drawTiles, false);

var boardSize = document.getElementById("puzzle").width;
var tileCount = document.getElementById("scale").value;

var tileSize = boardSize / tileCount;

var clickedTile = new Object;
clickedTile.x = 0;
clickedTile.y = 0;

var emptyTile = new Object;
emptyTile.x = 0;
emptyTile.y = 0;


var boardParts;
setBoard();

document.getElementById("scale").onchange = function() 
{
	tileCount = this.value;
	tileSize = boardSize / tileCount;
	setBoard();
	drawTiles();
};

document.getElementById("puzzle").onclick = function(event) 
{
	clickedTile.x = Math.floor((event.pageX - this.offsetLeft) / tileSize);
	clickedTile.y = Math.floor((event.pageY - this.offsetTop) / tileSize);

	if (distance(clickedTile.x, clickedTile.y, emptyTile.x, emptyTile.y) == 1) 
	{
		slideTile(emptyTile, clickedTile);
		drawTiles();
	}

	if (checkSolved()) 
	{
		setTimeout(function() {
			answer = confirm("You solved it!");
			if (answer)
			{
				setBoard();
				drawTiles();
			}
		}, 500);	
	}
};

function setBoard() 
{
	boardParts = new Array(tileCount);
	for (var i = 0; i < tileCount; ++i) 
	{
		boardParts[i] = new Array(tileCount);
		for (var j = 0; j < tileCount; ++j) 
		{
			boardParts[i][j] = new Object;
			boardParts[i][j].x = (tileCount - 1) - i;
			boardParts[i][j].y = (tileCount - 1) - j;
		}
	}
	emptyTile.x = boardParts[tileCount - 1][tileCount - 1].x;
	emptyTile.y = boardParts[tileCount - 1][tileCount - 1].y;
}

function drawTiles() 
{
	context.clearRect(0 , 0 , boardSize , boardSize);
	for (var i = 0; i < tileCount; ++i) 
	{
		for (var j = 0; j < tileCount; ++j) 
		{
			var x = boardParts[i][j].x;
			var y = boardParts[i][j].y;
			if(i != emptyTile.x || j != emptyTile.y || checkSolved() == true) 
			{
				context.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize,
				i * tileSize, j * tileSize, tileSize, tileSize);
			}
		}
	}
}

function distance(x1, y1, x2, y2) 
{
	return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function slideTile(toTile, fromTile) 
{
	if (!checkSolved()) 
	{
		boardParts[toTile.x][toTile.y].x = boardParts[fromTile.x][fromTile.y].x;
		boardParts[toTile.x][toTile.y].y = boardParts[fromTile.x][fromTile.y].y;
		boardParts[fromTile.x][fromTile.y].x = tileCount - 1;
		boardParts[fromTile.x][fromTile.y].y = tileCount - 1;
		toTile.x = fromTile.x;
		toTile.y = fromTile.y;
	}
}

function checkSolved() 
{
	for (var i = 0; i < tileCount; ++i) 
	{
		for (var j = 0; j < tileCount; ++j) 
		{
			if (boardParts[i][j].x != i || boardParts[i][j].y != j) 
			{
				return false;
			}
		}
	}
	return true;
}
