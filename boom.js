function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function createBoom(boom) {
    if (boom) {
        bombX = randint(4, matrix.length - 4);
        bombY = randint(4, matrix.length - 4);


        bombDirections = [
            [bombX, bombY],
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

module.exports = {createBoom};