
var side = 10;
let socket = io ()
let myMatrix = []


function setup() {
    setTimeout(() => {
        createCanvas(myMatrix[0].length * side, myMatrix.length * side);
        background('#acacac');

    }, 500);

    }


function drawing(matrix) {
// console.log(matrix);
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            } else if (matrix[y][x] == 0) {
                fill("gray");
            } else if (matrix[y][x] == 2) {
                fill("yellow")
            } else if (matrix[y][x] == 3) {
                fill("red")
            }else if (matrix[y][x] == 4) {
                fill("brown")
            }else if (matrix[y][x] == 5) {
                fill("black")
            }else if (matrix[y][x] == 6) {
                fill("pink")
            }

            rect(x * side, y * side, side, side);


        }
    }
}

grassCount = document.getElementById('grassNum')

function getGrassNum(num) {
    grassCount.innerText = num
}


socket.on("initial", function(data){
    console.log(data)
    myMatrix = data;
})

socket.on("send matrix", drawing)
socket.on("grass number", getGrassNum)