// Tic Tac Toe

function makePlayer(name) {
    let score = 0;
    const winGame = () => score++;
    const getScore = () => score;  
    return {name, winGame, getScore};
}

// Game Logic

const gameboard = function () {
    let board = [["","",""], ["","",""], ["","",""]];
    const markers = ["X","O"];
    let turn = 0;
    let winner = "";
    const getBoard = () => board;
    const getSpace = (row,col) => board[row-1][col-1];
    const resetBoard = () => {
        board = [["","",""], ["","",""], ["","",""]];
        winner = "";
        turn = 0;
    }
    const getTurn = () => markers[turn];
    const placeMarker = (row,col) => {
        const marker = markers[turn];
        if (board[row-1][col-1] === "") {
            board[row-1][col-1] = marker;
            if (checkWin(win)){
                winner = marker;
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
    


function checkWin() {
    let win = false;
    let winLocations = [];

    function isLine(arr) {
        // doesn't fulfill win condition if there are three empty strings in a row 
        if (arr[0] === "") { 
            return false;
        } else {
            return arr.every((value) => value === arr[0]);
        }
    }

    for (let i = 1; i <= 3; i++) {
        // check each row
        if (this.isLine(gameboard.getBoard()[i-1])) {
            push.winLocations(`row${i}`);
            win = true;
        };
        // check each column
        if (this.isLine(createArray.fromCol(i))) {
            push.winLocations(`col${i}`);
            win = true;
        };
    }

    // check diag1
    if (this.isLine(createArray.fromDiag1())) {
        push.winLocations('diag1');
        win = true;
    };
    // check diag2
    if (this.isLine(createArray.fromDiag2())) {
        push.winLocations('diag2');
        win = true;
    };

    return {win, winLocations, isLine};
};

const clickHandler = function () {
    const squares = document.querySelectorAll(".square");
    squares.forEach( (square) => square.addEventListener("click", () => {
        const p = square.firstChild;
        const getRow = p.getAttribute("id").charAt(1);
        const getCol = p.getAttribute("id").charAt(2);
        if (gameboard.getSpace(getRow,getCol) === "") {
            gameboard.placeMarker(getRow,getCol);
        } else {
            displayController.invalidMove();
        }

    }))
}();

const checkMarker = (function () {
    const isX = (item) => item === "X";
    const isO = (item) => item === "O";

    return {isX, isO};
})();


// Display Control

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
      statusText.textContent = gameboard.getTurn().concat(" to move.");
    };
    const invalidMove = () => {
        occupiedText.style.visibility = "visible";
    };
    return {updateDisplay, invalidMove};
}();