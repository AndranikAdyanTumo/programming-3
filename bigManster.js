const LivingCreature = require("./livingCreature")

module.exports = class BigManster extends LivingCreature{
    constructor(x, y, index){

        super(x, y, index);
        this.energy = 30;
        
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
            matrix[newY] [newX] = 4;
            bigMansterArr.push(new BigManster(newX, newY));
            this.energy = 20;
        }
    }
    
    eat() {
        var found = this.chooseCell(3);
        const newCell = this.random(found);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy+=5;

            for (var i in mansterArr) {
                if (newX == mansterArr[i].x && newY == mansterArr[i].y) {
                    mansterArr.splice(i, 1);
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
        var found1 = this.chooseCell(0);
        var found2 = this.chooseCell(1);
        let found = found1.concat(found2)

        var newCell = this.random(found);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY] [newX] = 4;

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
        for (var i in bigMansterArr) {
            if (this.x == bigMansterArr[i].x && this.y == bigMansterArr[i].y) {
                bigMansterArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y] [this.x] = 0;
    }

}
