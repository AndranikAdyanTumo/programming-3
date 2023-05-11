const matrix = [];
const n = 50;
var side = 10;


var grassArr = [];
var grassEaterArr = [];
var mansterArr = [];



function setup() {
    frameRate(10);

    let num = 0;
    for (let i = 0; i < n; i++) {
        matrix[i] = [];

        for (let j = 0; j < n; j++) {
            if (num < 20) {
                matrix[i][j] = random([0, 1]);
            } else if (num == 23) {
                num = 0;
            } else if (num > 20) {
                matrix[i][j] = random([0, 1, 2]);
            }
            num++;
        }
    }
    matrix[n/2][n/2] = 3
    console.table(matrix);




    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');



    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 1) {
                const gr = new Grass(j, i, 1);
                grassArr.push(gr);
            } else if (matrix[i][j] === 2) {
                const gre = new GrassEater(j, i, 1);
                grassEaterArr.push(gre);
            } else if (matrix[i][j] === 3) {
                const all = new Manster(j, i, 1);
                grassEaterArr.push(all);
            }
        }
    }


}

function draw() {

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