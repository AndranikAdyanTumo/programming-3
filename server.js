var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');

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
const boom = require("./boom")
const generator = require("./generator")


grassArr = [];
grassEaterArr = [];
mansterArr = [];
bigMansterArr = [];
bomberArr = [];
matrix = [];
let mull = 4


generator.generate(50, 1000, 100, 50, 30, 1);
// generator.generate(50, 2500, 0, 0, 0, 0);


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
function weather(x) {
    if (x) {
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



var gameFlag = true;
function gaming(game){
    gameFlag = game;
}



createCanvas()
setInterval(() => {

    if(gameFlag){

        data = {
            grass: grassArr.length,
            grassEater: grassEaterArr.length,
            manster: mansterArr.length,
            bigManster: bigMansterArr.length,
            bomber: bomberArr.length
        }
        
        
        const statisticsData = JSON.stringify(data)


        fs.writeFile("./statistics.json", statisticsData, err=>{
            if(err){
              console.log("Error writing file" ,err);
            }
        })


        io.emit('statistics', data)
        

        drawGame();
    }

}, 500);


io.on('connection', function (socket) {
    socket.emit('initial', matrix);
    socket.emit('send matrix', matrix);
    socket.on("weather signal", weather);
    socket.on('bomb signal', boom.createBoom);
    socket.on('gaming', gaming);
})