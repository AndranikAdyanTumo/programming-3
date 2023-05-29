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
const Bomber = require("./bomber");



grassArr = [];
grassEaterArr = [];
mansterArr = [];
bigMansterArr = [];
bomberArr = [];
matrix = [];
let mull = 4


function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}



function createBoom(b) {
    if (b) {
        bombX = randint(3, matrix.length - 3);
        bombY = randint(3, matrix.length - 3);


        bombDirections = [
            [bombX - 1, bombY - 1],
            [bombX + 1, bombY - 1],
            [bombX - 1, bombY],
            [bombX + 1, bombY],
            [bombX - 1, bombY + 1],
            [bombX, bombY + 1],
            [bombX, bombY - 1],
            [bombX + 1, bombY + 1],
            [bombX - 2, bombY],
            [bombX - 2, bombY + 2],
            [bombX, bombY + 2],
            [bombX + 2, bombY + 2],
            [bombX + 2, bombY],
            [bombX + 2, bombY - 2],
            [bombX, bombY - 2],
            [bombX - 2, bombY - 2],
            [bombX, bombY + 1],

            [bombX - 1, bombY - 2],
            [bombX + 1, bombY - 2],
            [bombX + 2, bombY - 1],
            [bombX + 2, bombY + 1],
            [bombX + 1, bombY + 2],
            [bombX - 1, bombY + 2],
            [bombX - 2, bombY - 1],
            [bombX - 2, bombY + 1],


            [bombX - 1, bombY - 3],
            [bombX, bombY - 3],
            [bombX + 1, bombY - 3],
            [bombX + 3, bombY - 3],

            [bombX + 3, bombY - 1],
            [bombX + 3, bombY],
            [bombX + 3, bombY + 1],
            [bombX + 3, bombY + 3],

            [bombX + 1, bombY + 3],
            [bombX, bombY + 3],
            [bombX - 1, bombY + 3],
            [bombX - 3, bombY + 3],

            [bombX - 3, bombY + 1],
            [bombX - 3, bombY],
            [bombX - 3, bombY - 1],
            [bombX - 3, bombY - 3]


        ]

        for (let i in bombDirections) {
           
            let x = bombDirections[i][0];
            let y = bombDirections[i][1];

            for (let i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            for (let i in grassEaterArr) {
                if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }

            for (let i in mansterArr) {
                if (x == mansterArr[i].x && y == mansterArr[i].y) {
                    mansterArr.splice(i, 1);
                    break;
                }
            }

            for (let i in bigMansterArr) {
                if (x == bigMansterArr[i].x && y == bigMansterArr[i].y) {
                    bigMansterArr.splice(i, 1);
                    break;
                }
            }


            matrix[y][x] = 0;
        }

    }


}



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

function gaming(g){
    gameFlag = g;
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
    socket.on('bomb signal', createBoom);
    socket.on('gaming', gaming);

})