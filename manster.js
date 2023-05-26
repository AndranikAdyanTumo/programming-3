const LivingCreature = require("./livingCreature")

module.exports = class Manster extends LivingCreature{
    constructor(x, y, index){

        super(x, y, index);
        this.energy = 15;
        
        }
        
        getNewCoordinates() {
        
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
            
            this.getNewCoordinates();
            return super.chooseCell(character);
        
        }
        
    
    mul() {
        var found = this.chooseCell(1);
        var newCell = this.random(found);
        if(newCell && this.energy >= 2) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY] [newX] = 3;
            mansterArr.push(new Manster(newX, newY));
            this.energy = 15;
        }
    }
    
    eat() {
        var found = this.chooseCell(2);
        const newCell = this.random(found);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy+=2;

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 10) {
                this.mul();
            }
        }
        else {
            this.move();
        }
        
    }


    move() {
        var found = this.chooseCell(0);
        var newCell = this.random(found);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY] [newX] = 3;

            matrix[this.y] [this.x] = 0;

            this.x = newX;
            this.y = newY;
        }
        this.energy--;

        if (this.energy < -0) {
            this.die();
        }
    }

    die() {
        for (var i in mansterArr) {
            if (this.x == mansterArr[i].x && this.y == mansterArr[i].y) {
                mansterArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y] [this.x] = 0;
    }

}
