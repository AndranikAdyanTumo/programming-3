var side = 10;
let socket = io()
let myMatrix = []


function setup() {
    setTimeout(() => {
        createCanvas(myMatrix[0].length * side, myMatrix.length * side);
        background('#acacac');

    }, 500);

}


//--------------------------------------------------

liserBtn = document.getElementById('liser');
liserBtn.addEventListener('click', LiserSignal);


liser = false
function LiserSignal() {
    liser = true;
    socket.emit('laser signal', liser);
    liser = false;
}



//--------------------------------------------------




weatherBtn = document.getElementById('weather');
weatherBtn.addEventListener('click', weatherColors);



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
                    grassEater: 'yellow',
                    manster: 'blue',
                    bigManster: 'brown',
                    bomber: 'black',
                    liser: 'red',
                }
            } else {
                colors = {
                    bg: 'gray',
                    grass: 'white',
                    grassEater: 'orange',
                    manster: 'aqua',
                    bigManster: 'pink',
                    bomber: 'black',
                    liser: 'red',
                }


            }
            if (matrix[y][x] == 0) {
                fill(colors.bg);
            } else if (matrix[y][x] == 1) {
                fill(colors.grass);
            } else if (matrix[y][x] == 2) {
                fill(colors.grassEater)
            } else if (matrix[y][x] == 3) {
                fill(colors.manster)
            } else if (matrix[y][x] == 4) {
                fill(colors.bigManster)
            } else if (matrix[y][x] == 5) {
                fill(colors.bomber)
            } else if (matrix[y][x] == 6) {
                fill(colors.liser)
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

function getGrassNum(data) {
    grassCount.innerText = data.grass;
    grassEaterCount.innerText = data.grassEater;
    mansterCount.innerText = data.manster;
    bigMansterCount.innerText = data.bigManster
    bomberCount.innerText = data.bomber;
}



socket.on("statistics", getGrassNum)