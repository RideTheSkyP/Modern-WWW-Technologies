const ROWS = 4;

var canvas;
var field;

var image;
var pieces;
var puzzleWidth;
var puzzleHeight;
var pieceWidth;
var pieceHeight;
var currentPiece;
var currentDropPiece;  

var mouse;

function init()
{
    image = new Image();
    image.addEventListener("load", onImage, false);
    image.src = "img.jpg";
}

function onImage(event)
{
    pieceWidth = Math.floor(image.width / ROWS)
    pieceHeight = Math.floor(image.height / ROWS)
    puzzleWidth = pieceWidth * ROWS;
    puzzleHeight = pieceHeight * ROWS;
    setCanvas();
    initPuzzle();
}

function setCanvas()
{
    field = document.getElementById("field");
    canvas = field.getContext("2d");
    field.width = puzzleWidth;
    field.height = puzzleHeight;
}

function initPuzzle()
{
    pieces = [];
    mouse = {x:0,y:0};
    currentPiece = null;
    currentDropPiece = null;
    canvas.drawImage(image, 0, 0, puzzleWidth, puzzleHeight, 0, 0, puzzleWidth, puzzleHeight);
    createTitle("Click to Start Solving The Puzzle");
    createPieces();
}

function createTitle(msg)
{
    canvas.fillStyle = "#000000";
    canvas.globalAlpha = .4;
    canvas.fillRect(100, puzzleHeight - 40, puzzleWidth - 200, 40);
    canvas.fillStyle = "#FFFFFF";
    canvas.globalAlpha = 1;
    canvas.textAlign = "center";
    canvas.textBaseline = "middle";
    canvas.font = "20px Arial";
    canvas.fillText(msg,puzzleWidth / 2,puzzleHeight - 20);
}

function createPieces()
{
    var piece;
    var xPos = 0;
    var yPos = 0;
    for(var i = 0;i < ROWS * ROWS;i++)
    {
        piece = {};
        piece.x = xPos;
        piece.y = yPos;
        pieces.push(piece);
        xPos += pieceWidth;
        if(xPos >= puzzleWidth)
        {
            xPos = 0;
            yPos += pieceHeight;
        }
    }
    document.onmousedown = shufflePuzzle;
}

function shufflePuzzle()
{
    pieces = shuffleArray(pieces);
    canvas.clearRect(0, 0, puzzleWidth, puzzleHeight);
    var i;
    var piece;
    var xPos = 0;
    var yPos = 0;
    for(i = 0; i < pieces.length; i++)
    {
        piece = pieces[i];
        piece.xPos = xPos;
        piece.yPos = yPos;
        canvas.drawImage(image, piece.x, piece.y, pieceWidth, pieceHeight, xPos, yPos, pieceWidth, pieceHeight);
        canvas.strokeRect(xPos, yPos, pieceWidth,pieceHeight);
        xPos += pieceWidth;
        if(xPos >= puzzleWidth)
        {
            xPos = 0;
            yPos += pieceHeight;
        }
    }
    document.onmousedown = onPuzzleClick;
}

function onPuzzleClick(event)
{
    if(event.layerX || event.layerX == 0)
    {
        mouse.x = event.layerX - field.offsetLeft;
        mouse.y = event.layerY - field.offsetTop;
    }
    else if(event.offsetX || event.offsetX == 0)
    {
        mouse.x = event.offsetX - field.offsetLeft;
        mouse.y = event.offsetY - field.offsetTop;
    }

    currentPiece = checkPieceClicked();
    
    if(currentPiece != null)
    {
        canvas.clearRect(currentPiece.xPos, currentPiece.yPos, pieceWidth, pieceHeight);
        canvas.save();
        canvas.globalAlpha = .9;
        canvas.drawImage(image, currentPiece.x, currentPiece.y, pieceWidth, pieceHeight, mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth, pieceHeight);
        canvas.restore();
        document.onmousemove = updatePuzzle;
        document.onmouseup = pieceDropped;
    }
}

function checkPieceClicked()
{
    var i;
    var piece;
    for(i = 0;i < pieces.length;i++)
    {
        piece = pieces[i];
        if(mouse.x < piece.xPos || mouse.x > (piece.xPos + pieceWidth) || mouse.y < piece.yPos || mouse.y > (piece.yPos + pieceHeight))
        {
            // Don't hit
        }
        else
        {
            return piece;
        }
    }
    return null;
}

function updatePuzzle(event)
{
    currentDropPiece = null;
    if(event.layerX || event.layerX == 0)
    {
        mouse.x = event.layerX - field.offsetLeft;
        mouse.y = event.layerY - field.offsetTop;
    }
    else if(event.offsetX || event.offsetX == 0)
    {
        mouse.x = event.offsetX - field.offsetLeft;
        mouse.y = event.offsetY - field.offsetTop;
    }
    
    canvas.clearRect(0, 0, puzzleWidth, puzzleHeight);
    
    var i;
    var piece;

    for(i = 0;i < pieces.length;i++)
    {
        piece = pieces[i];
        if(piece == currentPiece)
        {
            continue;
        }
        
        canvas.drawImage(image, piece.x, piece.y, pieceWidth, pieceHeight, piece.xPos, piece.yPos, pieceWidth, pieceHeight);
        canvas.strokeRect(piece.xPos, piece.yPos, pieceWidth, pieceHeight);
        
        if(currentDropPiece == null)
        {
            if(mouse.x < piece.xPos || mouse.x > (piece.xPos + pieceWidth) || mouse.y < piece.yPos || mouse.y > (piece.yPos + pieceHeight))
            {
                // Not ended
            }
            else
            {
                currentDropPiece = piece;
                canvas.save();
                canvas.globalAlpha = .4;
                canvas.fillStyle = "green";
                canvas.fillRect(currentDropPiece.xPos,currentDropPiece.yPos,pieceWidth, pieceHeight);
                canvas.restore();
            }
        }
    }

    canvas.save();
    canvas.globalAlpha = .6;
    canvas.drawImage(image, currentPiece.x, currentPiece.y, pieceWidth, pieceHeight, mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth, pieceHeight);
    canvas.restore();
    canvas.strokeRect( mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth,pieceHeight);
}

function pieceDropped(event)
{
    document.onmousemove = null;
    document.onmouseup = null;

    if(currentDropPiece != null)
    {
        var tmp = {xPos:currentPiece.xPos,yPos:currentPiece.yPos};
        currentPiece.xPos = currentDropPiece.xPos;
        currentPiece.yPos = currentDropPiece.yPos;
        currentDropPiece.xPos = tmp.xPos;
        currentDropPiece.yPos = tmp.yPos;
    }
    resetPuzzleAndCheckWin();
}

function resetPuzzleAndCheckWin()
{
    canvas.clearRect(0, 0, puzzleWidth, puzzleHeight);
    var gameWin = true;
    var i;
    var piece;

    for(i = 0; i < pieces.length; i++)
    {
        piece = pieces[i];
        canvas.drawImage(image, piece.x, piece.y, pieceWidth, pieceHeight, piece.xPos, piece.yPos, pieceWidth, pieceHeight);
        canvas.strokeRect(piece.xPos, piece.yPos, pieceWidth,pieceHeight);
        if(piece.xPos != piece.x || piece.yPos != piece.y)
        {
            gameWin = false;
        }
    }

    if(gameWin)
    {
        setTimeout(gameOver,500);
    }
}

function gameOver()
{
    document.onmousedown = null;
    document.onmousemove = null;
    document.onmouseup = null;
    initPuzzle();
}

function shuffleArray(array)
{
    for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return array;
}
