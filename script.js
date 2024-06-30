// Tic Tac Toe

// Game logic

function makePlayer(name) {
    let score = 0;
    const winGame = () => score++;
    const getScore = () => score;  
    return {name, winGame, getScore};
}

const Gameboard = function createGameboard () {
    let board = [["x","x","x"], ["x","x","x"], ["x","x","x"]];
    const getBoard = () => board;
    const getSpace = (row,col) => board[row-1][col-1];
    const markers = ["x","o"];
    let turn = 0;
    const placeMarker = (row,col) => {
        const marker = markers[turn];
        if (board[row-1][col-1] === "") {
            board[row-1][col-1] = marker;
            if(checkWin()) {
                console.log(`${markers[turn]} wins`);
            } else {
                turn === 0 ? turn = 1 : turn = 0;
            }
        } else {
            console.log('space already occupied, cannot place marker');
        }
    }

    return {getBoard, getSpace, placeMarker};
}();

const checkMarker = (function () {
    const isX = (item) => item === "x";
    const isO = (item) => item === "o";

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
    for (let i = 1; i <= 3; i++) {
        // check each row
        if (isLine(Gameboard.getBoard()[i-1])) {
            console.log(`row${i}`);
            win = true;
        };
        // check each column
        if (isLine(createArray.fromCol(i))) {
            console.log(`col${i}`);
            win = true;
        };
    }

    // check diag1
    if (isLine(createArray.fromDiag1())) {
        console.log('diag1');
        win = true;
    };
    // check diag2
    if (isLine(createArray.fromDiag2())) {
        console.log('diag2');
        win = true;
    };

    return win;
};