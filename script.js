const { Socket } = require('engine.io');
var io = require('socket.io')
var side = 10;

let myMatrix = []


function setup() {
    setTimeout(() => {

        createCanvas(myMatrix[0].length * side, myMatrix.length * side);
        background('#acacac');

    }, 500);

    }


function drawing(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");

            } else if (matrix[y][x] == 0) {
                fill("#acacac");

            } else if (matrix[y][x] == 2) {
                fill("#FFFD37")
            } else if (matrix[y][x] == 3) {
                fill("red")
            }

            rect(x * side, y * side, side, side);


        }
    }


}


socket.on("initial", function(data){
    myMatrix = data;
    return myMatrix;
})

socket.on("send matrix", function(matrix){
    drawing(matrix);

})