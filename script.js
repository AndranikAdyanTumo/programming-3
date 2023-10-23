var side = 10;
let socket = io()
let myMatrix = []


function setup() {
	setTimeout(() => {
		createCanvas(myMatrix[0].length * side, myMatrix.length * side);
		background('#acacac');

	}, 500);

}


gamingBtn = document.getElementById('gaming').addEventListener('click', start_stop);


game = true;

function start_stop(){
	if(game){
		game = false;
	}else{
		game = true;
	}

	socket.emit('gaming', game)
}



bomb = false;
function boom(){
	bomb = true;
	socket.emit('bomb signal', bomb)
	bomb = false
}
bombBtn = document.getElementById('bomb').addEventListener('click', boom);

weatherBtn = document.getElementById('weather').addEventListener('click', weatherColors);

weather = true;
function weatherColors() {
	if (weather) {
		weather = false;
	} else {
		weather = true;
	}
	socket.emit("weather signal", weather)
}


colors = {};

function drawing(matrix) {
	// console.log(matrix);
	for (var y = 0; y < matrix.length; y++) {
		for (var x = 0; x < matrix[y].length; x++) {

			if (weather) {
				colors = {
					bg: 'gray',
					grass: 'green',
					grassEater: 'lightGreen',
					manster: 'crimson',
					bigManster: 'violet',
					bomber: 'black',
					arsonist: 'yellow',
					fire: 'orange',
					// freezer: 'blue',
				}
			} else {
				colors = {
					bg: 'gray',
					grass: 'white',
					grassEater: 'khaki',
					manster: 'red',
					bigManster: 'pink',
					bomber: 'black',
					arsonist: 'yellow',
					fire: 'orange',
					// freezer: 'blue',
				}
			}

			switch (matrix[y][x]) {
				case 0:
					fill(colors.bg);
					break;
					
				case 1:
					fill(colors.grass);
					break;

				case 2:
					fill(colors.grassEater);
					break;

				case 3:
					fill(colors.manster);
					break;
		
				case 4:
					fill(colors.bigManster);
					break;

				case 5:
					fill(colors.bomber);
					break;

				case 6:
					fill(colors.arsonist);
					break;
				case 7:
					fill(colors.fire);
					break;

			}

			rect(x * side, y * side, side, side);
		}
	}
}


socket.on("initial", function (data) {
	myMatrix = data;
})

socket.on("send matrix", drawing)


grassCount = document.getElementById('grassNum');
grassEaterCount = document.getElementById('grassEaterNum');
mansterCount = document.getElementById('mansterNum');
bigMansterCount = document.getElementById('bigMansterNum');
bomberCount = document.getElementById('bomberNum');
arsonistCount = document.getElementById('arsonistNum')

function getGrassNum(data) {
	grassCount.innerText = data.grass;
	grassEaterCount.innerText = data.grassEater;
	mansterCount.innerText = data.manster;
	bigMansterCount.innerText = data.bigManster
	bomberCount.innerText = data.bomber;
	arsonistCount.innerText = data.arsonist;
}



socket.on("statistics", getGrassNum)