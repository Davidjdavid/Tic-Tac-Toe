function game() {
    // Gameboard to be made when a new game is started
    let board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    // Default token for now
    let playerToken = "X";

    // Get the gameboard element to store the tiles
    let gameBoard = document.getElementById("gameBoard");

    // Player object to create each player
    function player(name, tile, score) {
        this.name = name,
        this.tile = tile,
        this.score = score,
        this.increaseScore = function() {
            this.score += 1;
        }
        this.sayScores = function() {
            console.log("Players name is: " + this.name + " their tile is " + this.tile + " their score is: " + this.score);
        }
    }

    function createPlayer(token) {
        let playerName = prompt("What is your name?");
        if(!playerName) {
            playerName = "Default Player";
        }
        let playerCharater = new player(playerName, token, 0);
        return playerCharater;
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

    function createTile(xChord, yChord) {
        // Create a new div element for the tile
        const tile = document.createElement("div");
        tile.className = "tile";
        gameBoard.appendChild(tile);
        // Add the click event listener to the tile
        tile.addEventListener("click", () => {
            if((xChord < 0 || xChord > 2) || (yChord < 0 || yChord > 2)) {
                alert("You picked a spot not in bounds. Please try again");
            }
            else if(board[xChord][yChord] != 0) {
                alert("You picked a spot already taken. Please try again");
            } else {
                switch (playerToken) {
                    case "X":
                        tile.classList.add("playerTokenX");
                        break;
                    case "O":
                        tile.classList.add("playerTokenO");
                        break;
                    default:
                        break;
                }
                board[xChord][yChord] = playerToken;
                if(checkWin()) {
                    switch (playerToken) {
                        case "X":
                            playerOne.increaseScore();
                            break;
                        case "O":
                            playerTwo.increaseScore();
                            break;
                        default:
                            break;
                        
                    }
                    console.log("You win");
                    resetGame();
                } else {
                    switchPlayer();
                }
            }
        });
    }

    function switchPlayer() {
        switch (playerToken) {
            case "X":
                playerToken = "O";
                break;
            case "O":
                playerToken = "X";
                break;
            default:
                break;
        }
    }

    function displayBoard() {
        for (let xChord = 0; xChord < 3; xChord++) {
            for (let yChord = 0; yChord < 3; yChord++) {
                createTile(xChord, yChord);
            }
        }
    }

    function resetGame() {
        playerToken = "X";
        gameBoard.innerHTML = "";
        gameBoard = document.getElementById("gameBoard");
        for (let xChord = 0; xChord < 3; xChord++) {
            for (let yChord = 0; yChord < 3; yChord++) {
                board[xChord][yChord] = 0;
            }
        }
        playerOne.sayScores();
        playerTwo.sayScores();
        displayBoard();

    }

    
    // Game logic funtions. Everything past this line is what runs the game
    displayBoard();
    let playerOne = new createPlayer("X");
    let playerTwo = new createPlayer("O");
    playerOne.sayScores();
    playerTwo.sayScores();
}

game();