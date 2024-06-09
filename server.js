var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');
const PORT = 3000

app.use(express.static("."));

app.get('/', function (req, res) {
	res.redirect('index.html');
});


server.listen(PORT);
console.log(`Server running at http://localhost:${PORT}/`);

const Grass = require("./grass")
const GrassEater = require("./grassEater")
const Manster = require("./manster")
const BigManster = require("./bigManster")
const Bomber = require("./bomber")
const Arsonist = require("./arsonist")
const Fire = require("./fire")
const boom = require("./boom")
const generator = require("./generator");


grassArr = [];
grassEaterArr = [];
mansterArr = [];
bigMansterArr = [];
bomberArr = [];
arsonistArr = [];
fireArr = [];
matrix = [];
let mull = 4

matrixLen = 70;
generator.generate(matrixLen, 1000, 50, 25, 15, 1, 1);
// generator.generate(matrixLen, 2500, 0, 0, 0, 1, 1);


function createCanvas() {

	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			switch (matrix[i][j]) {
				case 1:
					const gr = new Grass(j, i);
					grassArr.push(gr);
					break;

				case 2:
					const gre = new GrassEater(j, i);
					grassEaterArr.push(gre);
					break;

				case 3:
					const manster = new Manster(j, i);
					mansterArr.push(manster);
					break;

				case 4:
					const bigManster = new BigManster(j, i);
					bigMansterArr.push(bigManster);
					break;

				case 5:
					const bomber = new Bomber(j, i);
					bomberArr.push(bomber);
					break;

				case 6:
					const arsonist = new Arsonist(j, i);
					arsonistArr.push(arsonist);
					break;

				case 7:
					const fire = new Fire(j, i);
					fireArr.push(fire);
					break;
			}
		}
	}
	
	return matrix;
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
	for (var i in arsonistArr) {
		arsonistArr[i].move();
	}
	for (var i in fireArr) {
		fireArr[i].eat();
	}

	io.emit("send matrix", matrix);
	return matrix;
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
			bomber: bomberArr.length,
			arsonist: arsonistArr.length,
		}

		const statisticsData = JSON.stringify(data)

		fs.writeFile("./statistics.json", statisticsData, err => {
			if(err){
				console.log("Error writing file" ,err);
			}
		})

		io.emit('statistics', data)

		drawGame();
	}

}, 300);


io.on('connection', function (socket) {
	socket.emit('initial', matrix);
	socket.emit('send matrix', matrix);
	socket.on("weather signal", weather);
	socket.on('bomb signal', boom.createBoom);
	socket.on('fire signal', (signal) => {
				for (var i in arsonistArr) {
					arsonistArr[i].burn(signal);
				}
			})
	socket.on('gaming', gaming);
})
 
process.on('SIGTSTP', () => {
	server.close(() => {
		console.log('Process terminated');
	});
});