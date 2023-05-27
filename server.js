var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3000);


const Grass = require("./grass")
const GrassEater = require("./grassEater")
const Manster = require("./manster")
const BigManster = require("./bigManster")
const Bomber = require("./bomber")


grassArr = [];
grassEaterArr = [];
mansterArr = [];
bigMansterArr = [];
bomberArr = [];
matrix = [];



function generate(matLen,gr,grEat,manster, bigManster, bomber) {
    for (let i = 0; i < matLen; i++) {
        matrix[i] = []
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0
        }
    }

    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random()*matLen)
        let y = Math.floor(Math.random()*matLen)
        if(matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random()*matLen)
        let y = Math.floor(Math.random()*matLen)
        if(matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }
    for (let i = 0; i < manster; i++) {
        let x = Math.floor(Math.random()*matLen)
        let y = Math.floor(Math.random()*matLen)
        if(matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }

    for (let i = 0; i < bigManster; i++) {
        let x = Math.floor(Math.random()*matLen)
        let y = Math.floor(Math.random()*matLen)
        if(matrix[y][x] == 0) {
            matrix[y][x] = 4
        }
    }

    for (let i = 0; i < bomber; i++) {
        let x = Math.floor(Math.random()*matLen)
        let y = Math.floor(Math.random()*matLen)
        if(matrix[y][x] == 0) {
            matrix[y][x] = 5;
        }
    }
    
    io.emit("send matrix",matrix)
    return matrix
}

generate(50, 100, 100, 50, 30, 1);

function createCanvas(){

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


function drawGame(){
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in mansterArr) {
        mansterArr[i].eat();
    }
    for(var i in bigMansterArr){
        bigMansterArr[i].eat();
    }
    for(var i in bomberArr){
        bomberArr[i].move();
    }

    io.emit("send matrix",matrix)
    return matrix

}


createCanvas()
setInterval(() => {
    data  = {
        grass : grassArr.length
    }
    io.emit('grass number',data)
    drawGame()
}, 500);

io.on('connection', function(socket){
    socket.emit('initial', matrix);
    socket.emit('send matrix', matrix);
    
})