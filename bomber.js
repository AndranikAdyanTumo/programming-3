const LivingCreature = require("./livingCreature")

module.exports = class Bomber extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.directions = [];
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
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getCordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

    }

    bomb = 0;
    move() {
        var found = this.chooseCell(0);
        var newCell = this.random(found);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY] [newX] = 5;

            matrix[this.y] [this.x] = 0;

            this.x = newX;
            this.y = newY;

            this.bomb++;
        }

        if(this.bomb == 5){
            for(var i in this.directions){
                matrix[this.directions[i][0]][this.directions[i][1] = 6];
            }

            this.bomb = 0;
        }

    }

}