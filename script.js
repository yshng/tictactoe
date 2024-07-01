// Tic Tac Toe

function makePlayer(name) {
    let score = 0;
    const winGame = () => score++;
    const getScore = () => score;  
    return {name, winGame, getScore};
}

const Gameboard = function createGameboard () {
    let board = [["","",""], ["","",""], ["","",""]];
    const getBoard = () => board;
    const getSpace = (row,col) => board[row-1][col-1];
    const markers = ["X","O"];
    let turn = 0;
    const placeMarker = (row,col) => {
        if (checkWin.win) {;} else {
            const statusText = document.querySelector(".status");
            const occupiedText = document.querySelector(".occupied");
            const marker = markers[turn];
            const gMarker = document.createElement("p");
            gMarker.textContent = marker;
            if (board[row-1][col-1] === "") {
                occupiedText.style.visibility = "hidden";
                board[row-1][col-1] = marker;
                const square = document.querySelector(`#s${row}${col}`);
                square.appendChild(gMarker);
                if(checkWin.win) {
                    statusText.textContent = `${markers[turn]} wins!`
                } else {
                    turn === 0 ? turn = 1 : turn = 0;
                    statusText.textContent = `${markers[turn]} to move`;
                }
            } else {
                occupiedText.style.visibility = "visible";
            }
        }
    }

    return {getBoard, getSpace, placeMarker};
}();

const activateSquares = function () {
    const squares = document.querySelectorAll(".square");
    squares.forEach( (square) => square.addEventListener("click", () => {
        const getRow = square.getAttribute("id").charAt(1);
        const getCol = square.getAttribute("id").charAt(2);
        Gameboard.placeMarker(getRow,getCol);
    }))
}();

const checkMarker = (function () {
    const isX = (item) => item === "X";
    const isO = (item) => item === "O";

    return {isX, isO};
})();

const createArray = (function () {
  
    const fromCol = (col) => {
        let log = [];
        for (let i = 1; i <= 3; i++) {
            log.push(Gameboard.getSpace(i, col));
        };
        return log;
    }

    const fromDiag1 = () => {
        let log = [];  
        for (let i = 1; i <= 3; i++) {
            log.push(Gameboard.getSpace(i, i));
        };
        return log;
    }

    const fromDiag2 = () => {
        let log = [];
        for (let i = 1; i <= 3; i++) {
            log.push(Gameboard.getSpace(i,4-i));
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

function checkWin() {
    let win = false;
    let winLocations = [];
    for (let i = 1; i <= 3; i++) {
        // check each row
        if (isLine(Gameboard.getBoard()[i-1])) {
            push.winLocations(`row${i}`);
            win = true;
        };
        // check each column
        if (isLine(createArray.fromCol(i))) {
            push.winLocations(`col${i}`);
            win = true;
        };
    }

    // check diag1
    if (isLine(createArray.fromDiag1())) {
        push.winLocations('diag1');
        win = true;
    };
    // check diag2
    if (isLine(createArray.fromDiag2())) {
        push.winLocations('diag2');
        win = true;
    };

    return {win, winLocations};
};