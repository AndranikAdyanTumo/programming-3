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


grassArr = [];
grassEaterArr = [];
mansterArr = [];
matrix = [];

let n = 50;

function myRandom(arr){
    index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

function createCanvas(){
    let num = 0;
    for (let i = 0; i < n; i++) {
        matrix[i] = [];

        for (let j = 0; j < n; j++) {
            if (num < 20) {
                matrix[i][j] = myRandom([0, 1]);
            } else if (num == 23) {
                num = 0;
            } else if (num > 20) {
                matrix[i][j] = myRandom([0, 1, 2]);
            }
            num++;
        }
    }
    matrix[n/2][n/2] = 3



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
                grassEaterArr.push(manster);
            }
        }
    }
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

}


createCanvas()
setInterval(() => {

    drawGame()

}, 1000);

io.on('connection', function(socket){
    socket.emit('initial', matrix);
    socket.emit('send matrix', matrix);

})