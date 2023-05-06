class Manster extends LivingCreture{
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 30;

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
        this.getCordinates();
        return super.chooseCell(character);

    }
    
    mul() {
        var found = this.chooseCell(1);
        var newCell = random(found);
        if(newCell && this.energy >= 2) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY] [newX] = 3;
            mansterArr.push(new Manster(newX, newY));
            this.energy = 1;
        }
    }
    
    eat() {
        var found = this.chooseCell(2);
        const newCell = random(found);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy++;

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
        var found1 = this.chooseCell(0);
        var found2 = this.chooseCell(1);
        var found = found1.concat(found2);
        var newCell = random(found);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY] [newX] = 3;

            matrix[this.y] [this.x] = Math.round(Math.random(1, 2));

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
