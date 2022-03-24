var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");
app.use(express.static("."));
app.get("/", function (req,res) {
    res.redirect('index.html')
})
server.listen(3000);
Grass = require('./Grass')
Eatgrass = require("./Eatgrass.js")
Predator = require("./Predator")
Shtorm = require("./Shtorm")
Shtormbr = require("./Shtormbr")

matrix = [];
rows = 25; // Տողերի քանակ
columns = 25
for (let y = 0; y < rows; y++) {
    matrix[y] = []; // Մատրիցի նոր տողի ստեղծում
    for (let x = 0; x < columns; x++) {
        let a = Math.floor(Math.random() * 100);
        if (a >= 0 && a < 30) {
            matrix[y][x] = 0; // Մատրիցի 20 տոկոսը կլինի 0
        }
        if (a >= 30 && a < 70) {
            matrix[y][x] = 1; // Մատրիցի 20 տոկոսը կլինի 1
        }
        else if (a >= 70 && a < 85) {
            matrix[y][x] = 2; // Մատրիցի 10 տոկոսը կլինի 2
        }
        else if (a >= 85 && a < 90) {
            matrix[y][x] = 3; // Մատրիցի 20 տոկոսը կլինի 3
        }
        else if (a >= 90 && a < 97) {
            matrix[y][x] = 4; // Մատրիցի 20 տոկոսը կլինի 4
        }
        else if (a >= 97 && a < 100) {
            matrix[y][x] = 5; // Մատրիցի 10 տոկոսը կլինի 5
        }
    }
}
io.sockets.emit('send matrix', matrix)
 eatArr = [];
 grassArr = [];
 predatorArr = [];
 shtormArr = [];
 shtormbrArr = [];



function createObject (matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var eatgrass = new Eatgrass(x, y);
                eatArr.push(eatgrass);
            }
            else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            }
            else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
            }
            else if (matrix[y][x] == 4) {
                var shtorm = new Shtorm(x, y);
                shtormArr.push(shtorm);
            }
            else if (matrix[y][x] == 5) {
                var shtormbr = new Shtormbr(x, y);
                shtormbrArr.push(shtormbr)
            }
        }  
    }
    io.sockets.emit('send matrix', matrix)  

}

function game(){
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    
    for (var i in eatArr) {
        eatArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    
    for (var i in shtormArr) {
        shtormArr[i].draw();
    }

    for (var i in shtormbrArr) {
        shtormbrArr[i].eat();
    }
    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000)

io.on('connection', function(socket){
    createObject(matrix);
})
