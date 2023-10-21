const LivingCreature = require("./livingCreature")

module.exports = class Bomber extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.bomb = 0;
    }

    getCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2],
            [this.x + 2, this.y ],
            [this.x + 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x - 2, this.y - 2],
        ];
    }

    chooseCell(character) {
        this.getCordinates()
        return super.chooseCell(character)

    }

    move() {
        var found1 = this.chooseCell(0);
        var found2 = this.chooseCell(1);
        let found = found1.concat(found2)

        var newCell = this.random(found);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            
            matrix[newY][newX] = 5;

            matrix[this.y][this.x] = 0;


            this.x = newX;
            this.y = newY;

            this.bomb++;
        }

        if(this.bomb == 5){

            for(var i in this.directions){
                let x = this.directions[i][0]
                let y = this.directions[i][1]
                if (( x> 2 &&  x< matrix[0].length - 2) && (y > 2 && y < matrix.length - 2)) {
                    for (var i in grassArr) {
                        if (x == grassArr[i].x && y == grassArr[i].y) {
                            grassArr.splice(i, 1);
                            break;
                        }
                    }

                    for (var i in grassEaterArr) {
                        if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                            grassEaterArr.splice(i, 1);
                            break;
                        }
                    }

                    for (var i in mansterArr) {
                        if (x == mansterArr[i].x && y == mansterArr[i].y) {
                            mansterArr.splice(i, 1);
                            break;
                        }
                    }

                    for (var i in bigMansterArr) {
                        if (x == bigMansterArr[i].x && y == bigMansterArr[i].y) {
                            bigMansterArr.splice(i, 1);
                            break;
                        }
                    }


                    matrix[y][x] = 0;
                }
                
            }

            this.bomb = 0;
        }

    }

}