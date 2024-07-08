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
        statusCheck.resetWins();
    }
    const getTurn = () => markers[turn];
    const getLastTurn = () => turn === 0 ? markers[1] : markers[0];
    const placeMarker = (row,col) => {
        const marker = markers[turn];
        if (board[row-1][col-1] === "") {
            board[row-1][col-1] = marker;
            turn === 0 ? turn = 1 : turn = 0;
            }
        } 
    return {getBoard, getTurn, getSpace, placeMarker, resetBoard, getLastTurn};

}();

// --------------------------
// Check for win conditions. 

const statusCheck = function () {
    let winLocations = [];
    const getWins = () => winLocations;
    const resetWins = () => winLocations = [];
    const isLine = function (arr) {
        // Doesn't count as line if there are three empty strings in a row 
        if (arr[0] === "") { 
            return false;
        } else {
            return arr.every((value) => value === arr[0]);
        };
    }

    const makeArray = function (nodels) {
        log = [];
        nodels.forEach( (item) => log.push(item.textContent))
        return log;
    }

    const runCheck = () => {

        // check each row and column
        for (let i = 1; i <= 3; i++) {
            const row = document.querySelectorAll(`.row${i} > p`)
            if (isLine(makeArray(row))) {
                winLocations.push(`row${i}`);
            };
            const col = document.querySelectorAll(`.col${i} > p`)
            if (isLine(makeArray(col))) {
                winLocations.push(`col${i}`);
            };
        }

        // check diagonals
        for (let i = 1; i <= 2; i++) {
            const diag = document.querySelectorAll(`.diag${i} > p`)
            if (isLine(makeArray(diag))) {
                winLocations.push(`diag${i}`);
            };
       }
    }

    return {runCheck, getWins, resetWins};
}();


// --------------------------
// Make user interaction work

const clickHandler = function () {
    const squares = document.querySelectorAll(".square");

    squares.forEach( (square) => square.addEventListener("click", () => {
        const p = square.firstChild;
        const getRow = p.getAttribute("id").charAt(1);
        const getCol = p.getAttribute("id").charAt(2);
        if (statusCheck.getWins().length !== 0) {
            ;
        } else if (gameboard.getSpace(getRow,getCol) === "") {
            gameboard.placeMarker(getRow,getCol);
            displayController.updateDisplay();
        } else  {
            displayController.invalidMove();
        }
    }));

    const resetBoardButton = document.querySelector("#reset-board");
    resetBoardButton.addEventListener("click", () => {
        gameboard.resetBoard();
        displayController.removeHighlights();
        displayController.updateDisplay();
    });


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
      statusCheck.runCheck();
      if (statusCheck.getWins().length !== 0) {
        statusText.textContent = `${gameboard.getLastTurn()} wins!`;
        highlightWin();
      } else {
        statusText.textContent = gameboard.getLastTurn().concat(" to move.");
      };
    }
    const invalidMove = () => occupiedText.style.visibility = "visible";

    const highlightWin = () => {
        statusCheck.getWins().forEach( (location) => {
            const squares = document.querySelectorAll(`.${location}`);
            squares.forEach( (square) => (square.style.backgroundColor = "var(--win-color)"));

        });
    };

    const removeHighlights = () => {
        const squares = document.querySelectorAll(".square");
        squares.forEach( (square) => (square.style.backgroundColor = "#fff"));
    }

    return {updateDisplay, invalidMove, highlightWin, removeHighlights};
}();

