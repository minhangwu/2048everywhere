const moveTiles = require('./move');

let example = [
    [4,4,2,2],
    [4,0,2,2],
    [2,2,0,0],
    [2,2,0,4]
];

let leftResult = [
    [8,4,0,0],
    [4,4,0,0],
    [4,0,0,0],
    [4,4,0,0]
];

let upResult = [
    [8,4,4,4],
    [4,4,0,4],
    [0,0,0,0],
    [0,0,0,0]
];

let rightResult = [
    [0,0,8,4],
    [0,0,4,4],
    [0,0,0,4],
    [0,0,4,4]
];

let downResult = [
    [0,0,0,0],
    [0,0,0,0],
    [8,4,0,4],
    [4,4,4,4]
];

test('Move Left', () => {
    expect(moveTiles(example, 'left')).toStrictEqual(leftResult);
});

test('Move Up', () => {
    expect(moveTiles(example, 'up')).toStrictEqual(upResult);
});

test('Move Right', () => {
    expect(moveTiles(example, 'right')).toStrictEqual(rightResult);
});

test('Move Down', () => {
    expect(moveTiles(example, 'down')).toStrictEqual(downResult);
});
