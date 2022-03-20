var socket = io()

side = 30

function setup() {
    frameRate(50)
    createCanvas(7 * side, 14 * side)
    background('#acacac');
}

function nkarvox(matrix){
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green")
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac")
            }
            else if (matrix[y][x] == 2) {
                fill('orange');
            }
            else if (matrix[y][x] == 3) {
                fill('red');
            }
            else if (matrix[y][x] == 4) {
                fill("white");
            }
            else if (matrix[y][x] == 5) {
                fill("black");
            }
            rect(x * side, y * side, side, side)
        }
    }
}

setInterval(function () {
    socket.on('send matrix', nkarvox)
},1000)