function slide(row) {
    let length = row.length;

    // Remove zeros
    row = row.filter(value => value !==0);

    // Join tiles
    for (let i=1;i<row.length;i++) {
        if (row[i-1] === row[i]) {
            row[i-1] *= 2;
            row[i] = 0;
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

module.exports = moveTiles;