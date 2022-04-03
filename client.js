var socket = io()

side = 30

function setup() {
    frameRate(50)
    createCanvas(5 * side, 5 * side)
    background('#acacac');
}

let weath = "winter";

socket.on("weather", function (pr) {
    weath = pr;
})

function nkarvox(matrix){
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                if(weath == "spring"){
                    fill("#0d4211")
                }
                if(weath == "winter"){
                    fill("#d8ebd9")
                }
                if(weath == "autumn"){
                    fill("#889c19")
                }
                if(weath == "summer"){
                    fill("#089e00")
                }
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac")
            }
            else if (matrix[y][x] == 2) {
                if(weath == "autumn" || "summer"){
                    fill("#d4a444")
                }
                if(weath == "winter" || "spring"){
                    fill("#de9709")
                }
                console.log(weath)
            }
            else if (matrix[y][x] == 3) {
                if(weath == "autumn" || "summer"){
                    fill("#ad4f40")
                }
                if(weath == "winter" || "spring"){
                    fill("#c9331c")
                }
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

let kill = document.querySelector('#kill');
kill.addEventListener('click', () => {
    socket.emit("kill")
})
let reanimate = document.getElementById('reanimate')
reanimate.addEventListener('click', () => {
    socket.emit("reanimate")
})

