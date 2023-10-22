const { log } = require('console');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

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

		matrix[y][x] = 1
	}
	for (let i = 0; i < grEat; i++) {
		let x = Math.floor(Math.random() * matLen)
		let y = Math.floor(Math.random() * matLen)

		matrix[y][x] = 2
	}
	for (let i = 0; i < manster; i++) {
		let x = Math.floor(Math.random() * matLen)
		let y = Math.floor(Math.random() * matLen)

		matrix[y][x] = 3
	}

	for (let i = 0; i < bigManster; i++) {
		let x = Math.floor(Math.random() * matLen)
		let y = Math.floor(Math.random() * matLen)

		matrix[y][x] = 4
	}

	for (let i = 0; i < bomber; i++) {
		let x = Math.floor(Math.random() * matLen)
		let y = Math.floor(Math.random() * matLen)

		matrix[y][x] = 5;
	}


	let y = Math.floor(matLen / 2);
	let x = Math.floor(matLen / 2);
	freezerBody = [
		[x, y],
		[x - 1, y - 1],
		[x, y - 1],
		[x + 1, y - 1],
		[x - 1, y],
		[x + 1, y],
		[x - 1, y + 1],
		[x, y + 1],
		[x + 1, y + 1],
	];

	for(let cordinates of freezerBody){
		matrix[cordinates[1]][cordinates[0]] = 6;
	}

	io.emit("send matrix", matrix);
	return matrix;
}

module.exports = {generate}