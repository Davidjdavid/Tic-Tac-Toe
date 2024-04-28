// Global variables

let board = [];
let displayString = ""
player1 = 1
player2 = 2

// Starts the game. New game runs whenever you refresh the page or someone wins
newGame();

function newGame() {

    createBoard();
    turn(player1);
    function createBoard() {

        for(let i = 0; i < 3; i++) {
            board[i] = [];
            for(let j = 0; j < 3; j++) {
                board[i][j] = 0;
            }
        }
    }
}

// Displays the game in the console
function displayBoard() {
    displayString = ""
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            displayString = displayString + board[i][j];
            displayString = displayString + " | "
        }
        displayString = displayString + "\n";
    }
    console.log(displayString);
    if(checkWin()) {
        console.log("Winner!");
        newGame();
    }
}

// Checks to make sure the space you are selecting is set to 0 (a.k.a empty)
// TODO: Check to make sure the inputs by the player are valid
function validMove(xChord, yChord) {
    if (board[xChord][yChord] === 0) {
        return true;
    }
    return false;
}

// Runs checks to see if matching numbers in rows, columns, or diagonal
function checkWin() {

    // if each row, column, daigonal direction dosen't match it returns false
    if (checkForRow() || checkForColumn() || checkForDiagonal()) {
        return true;
    }
    return false;

    // Looks at each row in the board array 
    function checkForRow() {
        for (let row of board) {
            const valueMatch = row[0];
            if (row.every(val => val === valueMatch && val !== 0)) {
                return true;
            }
        }
    }
        
    // Looks at each column in the board array
    function checkForColumn() {
        for (let j = 0; j < 3; j++) {
            const valueMatch = board[0][j];
            if (board.every(row => row[j] === valueMatch && valueMatch !== 0)) {
                return true;
            }
        }
    }    

    // Looks at the two diagonal directions the board array could match
    function checkForDiagonal() {
        const valueMatch = board[0][0];
        if (valueMatch !== 0 && board[1][1] === valueMatch && board[2][2] === valueMatch) {
            return true;
        }
        const valueMatch2 = board[0][2];
        if (valueMatch2 !== 0 && board[1][1] === valueMatch2 && board[2][0] === valueMatch2) {
            return true;
        }
    }    
}

// Prompts the player to pick a space to put their space. Runs itself for the other player forever
// TODO: Make selecting the area you want to select can handle invalid or null options.
// TODO: Make it easier to understand how to handle the user input instead of blank prompt boxes
function turn(player) {
    let choiceHor = prompt();
    let choiceVer = prompt();
    if(validMove(choiceHor, choiceVer)) {
        console.log("valid move");
        board[choiceHor][choiceVer] = player;
        displayBoard();
        if(player === 1) {
            turn(player2);
        } else {
            turn(player1);
        }
    } else {
        console.log("Space already taken, pick another spot");
        turn(player);
    }
}