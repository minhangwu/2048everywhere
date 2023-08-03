const moveTiles = require('./move');

var tiles = []
var size = 4

// Create size*size tiles with default value of 0
function createBoard() {
    for(let i=0; i<size; i++) {
        tiles[i] = []
        for(let j=0; j<size; j++) {
            tiles[i][j] = 0;
        }
    }

    // Everytime we create a new board, we start with two tiles
    addTile();
    addTile();
    updateBoard();
}

// Update the entire gameboard with values in tiles
function updateBoard() {
    let grid = document.querySelector('#grid');
    grid.innerHTML = '';
    for(let i=0; i<size; i++) {
        for(let j=0; j<size; j++) {
            let tile = document.createElement('div');
            tile.classList.add('tiles')
            // Only numbers greater than 0 will be displayed
            if (tiles[i][j] !== 0) {
                tile.innerHTML = tiles[i][j];
            }
            grid.appendChild(tile);
        }
    }
}

// Add a tile at a random empty location with value of 2 or 4
function addTile() {
    let row, col = 0;
    do {
        row = randomNumber(0, 4);
        col = randomNumber(0, 4); 
    } while(tiles[row][col] !== 0);
    tiles[row][col] = randomSelector(2, 4);
}

// Generate a random number between min and max
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// Return one of two input values randomly
function randomSelector(option1, option2) {
    let rand = Math.random();
    if (rand < 0.5) {
        return option1;
    } else {
        return option2;
    }
}

function tilesEqual(tiles1, tiles2) {
    for (let i=0;i<tiles1.length;i++) {
        for (let j=0;j<tiles1.length;j++) {
            if (tiles1[i][j] !== tiles2[i][j]) {
                return false;
            }
        }
    }
    return true;
}

function move(direction) {
    let newTiles = moveTiles(tiles, direction);
    
    if (!tilesEqual(newTiles, tiles)) {
        tiles = newTiles;
        addTile();
        updateBoard();

        if (hasWon()) {
            alert('You Won!');
            createBoard();
        } else if (isGameOver()) {
            alert('Game Over!');
            createBoard();
        }
    }
}

// Check if game is over by checking if there is any 0 in board
function isGameOver() {
    for (let i = 0; i < tiles.length; i++) {
        for (let j = 0; j < tiles[i].length; j++) {
          if (tiles[i][j] === 0) {
            return false;
          }
          if (i < tiles.length - 1 && tiles[i][j] === tiles[i + 1][j]) {
            return false;
          }
          if (j < tiles[i].length - 1 && tiles[i][j] === tiles[i][j + 1]) {
            return false;
          }
        }
      }
      return true;
}

function hasWon() {
    for (let i = 0; i < tiles.length; i++) {
        for (let j = 0; j < tiles[i].length; j++) {
            if (tiles[i][j] === 2048) {
                return true;
            }
        }
    }
    return false;
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    createBoard(size);
});

// Listen to the key up and move to the given direction
document.addEventListener('keyup', (key) => {
    switch (key.code) {
        case 'ArrowLeft':
        case 'KeyA':
            move('left');
            break;
        
        case 'ArrowUp':
        case 'KeyW':
            move('up');
            break;

        case 'ArrowRight':
        case 'KeyD':
            move('right');
            break;

        case 'ArrowDown':
        case 'KeyS':
            move('down');
            break;
    }
})

module.exports = moveLeft;