var tiles = [];
var size = 4;
var score = 0;

// Create size*size tiles with default value of 0
function createBoard() {
    // Reset score to 0
    score = 0;
    
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
    const board = document.querySelector('.board');
    board.innerHTML = '';
    for(let i=0; i<size; i++) {
        for(let j=0; j<size; j++) {
            let tile = document.createElement('div');
            tile.classList.add('tile');
            // Only numbers greater than 0 will be displayed
            if (tiles[i][j] !== 0) {
                tile.innerHTML = tiles[i][j];
                tile.classList.add(`tile-${tiles[i][j]}`);
            }
            board.appendChild(tile);
        }
    }
    updateScore();
}

function updateScore() {
    const scoreElement = document.querySelector('#score');
    scoreElement.textContent = score.toString();
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

// Return if two array of tiles equal
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

function slide(row) {
    let length = row.length;

    // Remove zeros
    row = row.filter(value => value !==0);

    // Join tiles
    for (let i=1;i<row.length;i++) {
        if (row[i-1] === row[i]) {
            row[i-1] *= 2;
            row[i] = 0;
            // Add score
            score += row[i-1];
        }
    }
    
    // Remove zeros
    row = row.filter(value => value !==0);

    // Add back zeros to end of row
    for (let i=0;i<length;i++) {
        if (!row[i]) {
            row[i] = 0;
        }
    }

    return row;
}

function transformTiles(tiles, operation) {
    let temp = [];

    for (let i = 0; i < tiles.length; i++) {
        temp[i] = [];
        for (let j = 0; j < tiles.length; j++) {
            let newI, newJ;
            if (operation === "transpose") {
                newI = j;
                newJ = i;
            } else if (operation === "flip") {
                newI = i;
                newJ = tiles.length - 1 - j;
            }
            temp[i][j] = tiles[newI][newJ];
        }
    }

    return temp;
}

function moveTiles(tiles, direction) {
    // Make a deep copy of tiles
    let temp = JSON.parse(JSON.stringify(tiles));

    // Transform tiles for slide function
    switch (direction) {
        case 'left':
            break;
        case 'up':
            temp = transformTiles(temp, 'transpose');
            break;
        case 'right':
            temp = transformTiles(temp, 'flip');
            break;
        case 'down':
            temp = transformTiles(temp, 'transpose');
            temp = transformTiles(temp, 'flip');
            break;
    }

    for (let i=0;i<temp.length;i++) {
        temp[i] = slide(temp[i]);
    }

    // Transform back to original form
    switch (direction) {
        case 'left':
            break;
        case 'up':
            temp = transformTiles(temp, 'transpose');
            break;
        case 'right':
            temp = transformTiles(temp, 'flip');
            break;
        case 'down':
            temp = transformTiles(temp, 'flip');
            temp = transformTiles(temp, 'transpose');
            break;
    }

    return temp;
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
