// Tic Tac Toe

// --------------------------
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
        statusCheck.winLocations = [];
        displayController.removeHighlights();
    }
    const getTurn = () => markers[turn];
    const placeMarker = (row,col) => {
        const marker = markers[turn];
        if (board[row-1][col-1] === "") {
            board[row-1][col-1] = marker;
            statusCheck.runCheck();
            if (statusCheck.winLocations.length !== 0) {
                ;
            } else {
                turn === 0 ? turn = 1 : turn = 0;
            }
        } 
    }
    return {getBoard, getTurn, getSpace, placeMarker, resetBoard};

}();

// --------------------------
// Functions to help check for win conditions. 

// 1. Helper function to create arrays from all potential 3-in-a-row "line" locations so they can be checked using isLine function. Do not need one for rows because each row is already an array.

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

// 2. Helper function to detect 3-in-a-row "line" in an array by checking against first value in array.
    
function isLine(arr) {
    // Doesn't count as line if there are three empty strings in a row 
    if (arr[0] === "") { 
        return false;
    } else {
        return arr.every((value) => value === arr[0]);
    }
}

// 3. Check each array and store the locations for any detected 3-in-a-row. 

const statusCheck = function () {
    let winLocations = [];

    const runCheck = () => {

        for (let i = 1; i <= 3; i++) {
            // check each row
            if (isLine(gameboard.getBoard()[i-1])) {
                winLocations.push(`row${i}`);
            };
            // check each column
            if (isLine(createArray.fromCol(i))) {
                winLocations.push(`col${i}`);
            };
        }

        // check diag1
        if (isLine(createArray.fromDiag1())) {
            winLocations.push('diag1');
        };
        // check diag2
        if (isLine(createArray.fromDiag2())) {
            winLocations.push('diag2');
        };
    }

    return {runCheck, winLocations};
}();


// --------------------------
// Make user interaction work

const clickHandler = function () {
    const squares = document.querySelectorAll(".square");
    squares.forEach( (square) => square.addEventListener("click", () => {
        const p = square.firstChild;
        const getRow = p.getAttribute("id").charAt(1);
        const getCol = p.getAttribute("id").charAt(2);
        if (statusCheck.winLocations.length !== 0) {
            ;
        } else if (gameboard.getSpace(getRow,getCol) === "") {
            gameboard.placeMarker(getRow,getCol);
            displayController.updateDisplay();
        } else  {
            displayController.invalidMove();
        }
    }))
}();

const displayController = function () {
    const statusText = document.querySelector(".status");
    const occupiedText = document.querySelector(".occupied");
    const updateDisplay = () => {
      occupiedText.style.visibility = "hidden";
      const board = gameboard.getBoard();
      for (i = 1; i <=3; i++) {
        for (j = 1; j <= 3; j++) {
            const squareText = document.querySelector(`#s${i}${j}`);
            squareText.textContent = board[i-1][j-1];
        }
      }
      if (statusCheck.winLocations.length !== 0) {
        statusText.textContent = `${gameboard.getTurn()} wins!`;
        highlightWin();
      } else {
        statusText.textContent = gameboard.getTurn().concat(" to move.");
      };
    }
    const invalidMove = () => occupiedText.style.visibility = "visible";

    const highlightWin = () => {
        statusCheck.winLocations.forEach( (location) => {
            const squares = document.querySelectorAll(`.${location}`);
            squares.forEach( (square) => (square.style.backgroundColor = "#62cac9"));

        });
    };

    const removeHighlights = () => {
        const squares = document.querySelectorAll(".square");
        squares.forEach( (square) => (square.style.backgroundColor = "#fff"));
    }

    return {updateDisplay, invalidMove, highlightWin, removeHighlights};
}();

