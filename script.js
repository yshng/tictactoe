// Tic Tac Toe


// Game Logic

const gameboard = function () {
    let board = [["","",""], ["","",""], ["","",""]];
    const markers = ["X","O"];
    let turn = 0;
    const getBoard = () => board;
    const getSpace = (row,col) => board[row-1][col-1];
    const resetBoard = () => {
        board = [["","",""], ["","",""], ["","",""]];
        turn = 0;
    }
    const getTurn = () => markers[turn];
    const placeMarker = (row,col) => {
        const marker = markers[turn];
        if (board[row-1][col-1] === "") {
            board[row-1][col-1] = marker;
            statusCheck.runCheck();
            if (statusCheck.gameOver) {
                ;
            } else {
                turn === 0 ? turn = 1 : turn = 0;
            }
        } 
    }
    return {getBoard, getTurn, getSpace, placeMarker, resetBoard};

}();


const createArray = (function () {

    const fromCol = (col) => {
        let log = [];
        for (let i = 1; i <= 3; i++) {
            log.push(gameboard.getSpace(i, col));
        };
        return log;
    }

    const fromDiag1 = () => {
        let log = [];  
        for (let i = 1; i <= 3; i++) {
            log.push(gameboard.getSpace(i, i));
        };
        return log;
    }

    const fromDiag2 = () => {
        let log = [];
        for (let i = 1; i <= 3; i++) {
            log.push(gameboard.getSpace(i,4-i));
        };
        return log;
    }

    return {fromCol, fromDiag1, fromDiag2};

})();
    
function isLine(arr) {
    // doesn't fulfill win condition if there are three empty strings in a row 
    if (arr[0] === "") { 
        return false;
    } else {
        return arr.every((value) => value === arr[0]);
    }
}

const statusCheck = function () {
    let gameOver = false;
    let winLocations = [];

    function logWin () {
        gameOver = true;
        winner = gameboard.getTurn();
    };

    const runCheck = () => {

        for (let i = 1; i <= 3; i++) {
            // check each row
            if (isLine(gameboard.getBoard()[i-1])) {
                winLocations.push(`row${i}`);
                logWin();
            };
            // check each column
            if (isLine(createArray.fromCol(i))) {
                winLocations.push(`col${i}`);
                logWin();
            };
        }

        // check diag1
        if (isLine(createArray.fromDiag1())) {
            winLocations.push('diag1');
            logWin();
        };
        // check diag2
        if (isLine(createArray.fromDiag2())) {
            winLocations.push('diag2');
            logWin();
        };
    }

    return {runCheck, gameOver, winLocations};
}();

const clickHandler = function () {
    const squares = document.querySelectorAll(".square");
    squares.forEach( (square) => square.addEventListener("click", () => {
        const p = square.firstChild;
        const getRow = p.getAttribute("id").charAt(1);
        const getCol = p.getAttribute("id").charAt(2);
        if (!checkStatus.gameOver && gameboard.getSpace(getRow,getCol) === "") {
            gameboard.placeMarker(getRow,getCol);
            displayController.updateDisplay();
        } else if (!checkStatus.gameOver) {
            displayController.invalidMove();
        } else {
            ;
        }
    }))
}();

// Display Control

const displayController = function () {
    const statusText = document.querySelector(".status");
    const occupiedText = document.querySelector(".occupied");
    const updateDisplay = () => {
      occupiedText.style.visibility = "hidden";
      checkWin();
      const board = gameboard.getBoard();
      for (i = 1; i <=3; i++) {
        for (j = 1; j <= 3; j++) {
            const squareText = document.querySelector(`#s${i}${j}`);
            squareText.textContent = board[i-1][j-1];
        }
      }
      if (gameboard.gameOver) {
        statusText.textContent = checkWin().
      } 
      statusText.textContent = gameboard.getTurn().concat(" to move.");
    };
    const invalidMove = () => {
        occupiedText.style.visibility = "visible";
    };
    return {updateDisplay, invalidMove};
}();