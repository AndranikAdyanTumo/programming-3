var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
let mull = 4

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);


const Grass = require("./grass")
const GrassEater = require("./grassEater")
const Manster = require("./manster")
const BigManster = require("./bigManster")
const Bomber = require("./bomber");
const { setTimeout } = require('timers/promises');


grassArr = [];
grassEaterArr = [];
mansterArr = [];
bigMansterArr = [];
bomberArr = [];
matrix = [];

//--------------------------------------------------

liserY = null;

function createLiser(l){
    if(l){

        liserY = Math.floor(Math.random() * matrix.length - 2)

        for(var i in matrix){
            matrix[liserY][i] = 6;
            matrix[liserY + 1][i] = 6;
            matrix[liserY + 2][i] = 6;

            for (var i in grassArr) {
                if (liserY <= grassArr[i].y && liserY >= grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            for (var i in grassEaterArr) {
                if (liserY <= grassEaterArr[i].y && liserY >= grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }

            for (var i in mansterArr) {
                if (liserY <= mansterArr[i].y && liserY >= mansterArr[i].y) {
                    mansterArr.splice(i, 1);
                    break;
                }
            }

            for (var i in bigMansterArr) {
                if (liserY <= bigMansterArr[i].y && liserY >= bigMansterArr[i].y) {
                    bigMansterArr.splice(i, 1);
                    break;
                }
            }

            for (var i in bomberArr) {
                if (liserY <= bomberArr[i].y && liserY >= bomberArr[i].y) {
                    bomberArr.splice(i, 1);
                    break;
                }
            }

        }

    }

}


//--------------------------------------------------
function generate(matLen, gr, grEat, manster, bigManster, bomber) {
    for (let i = 0; i < matLen; i++) {
        matrix[i] = []
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0
        }
    }

    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }
    for (let i = 0; i < manster; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }

    for (let i = 0; i < bigManster; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
        }
    }

    for (let i = 0; i < bomber; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
        }
    }

    io.emit("send matrix", matrix)
    return matrix
}

generate(50, 100, 100, 50, 30, 1);
function createCanvas() {

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 1) {
                const gr = new Grass(j, i, 1);
                grassArr.push(gr);
            } else if (matrix[i][j] === 2) {
                const gre = new GrassEater(j, i, 1);
                grassEaterArr.push(gre);
            } else if (matrix[i][j] === 3) {
                const manster = new Manster(j, i, 1);
                mansterArr.push(manster);
            } else if (matrix[i][j] === 4) {
                const bigManster = new BigManster(j, i, 1);
                bigMansterArr.push(bigManster);
            } else if (matrix[i][j] === 5) {
                const bomber = new Bomber(j, i, 1);
                bomberArr.push(bomber);
            }
        }
    }
    return matrix
}
function weather(x){
    if(x === true){
        mull = 4
    }
    else {
        mull = 10
    }
}

function drawGame() {
    for (var i in grassArr) {
        grassArr[i].mul(mull);
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in mansterArr) {
        mansterArr[i].eat();
    }
    for (var i in bigMansterArr) {
        bigMansterArr[i].eat();
    }
    for (var i in bomberArr) {
        bomberArr[i].move();
    }

    io.emit("send matrix", matrix)
    return matrix

}

createCanvas()
setInterval(() => {
    data = {
        grass: grassArr.length,
        grassEater: grassEaterArr.length,
        manster: mansterArr.length,
        bigManster: bigMansterArr.length,
        bomber: bomberArr.length
    }
    io.emit('statistics', data)
    drawGame();
    
    for(var i in matrix){
        if(liserY != null){
            matrix[liserY][i] = 0;
            matrix[liserY + 1][i] = 0;
            matrix[liserY + 2][i] = 0;
        }
    }
    
    liserY = null;

}, 250);




io.on('connection', function (socket) {
    socket.emit('initial', matrix);
    socket.emit('send matrix', matrix);
    socket.on("weather signal", weather)
    socket.on("laser signal", createLiser)
})