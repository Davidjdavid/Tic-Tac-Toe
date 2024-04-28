let board = [];

createBoard();

// Creates the board and places the tiles
function createBoard() {

    // Creates a new Tic-Tac-Toe space each loop
    for (var i = 0; i < 3; i++) {
        board[i] = []; // Create a new row
        for (var j = 0; j < 3; j++) {
            const tile = document.createElement("div");
            document.getElementById("gameBoard").appendChild(tile);
            tile.className = "tile";
            tile.addEventListener("click", clickTile);
            board[i][j] = 0; // Initialize the element at row i, column j to 0
        }
    }

}


function clickTile(){  
    console.log("test");
}

