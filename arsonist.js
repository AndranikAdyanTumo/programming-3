const LivingCreature = require("./livingCreature")
const Fire = require("./fire")

module.exports = class Arsonist extends LivingCreature {
	constructor(x, y) {
		super(x, y);
		this.fire = 0;
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
			
			matrix[newY][newX] = 6;

			matrix[this.y][this.x] = 0;


			this.x = newX;
			this.y = newY;

			this.fire++;
		}

		if(this.fire == 30){

			for(var i in this.directions){
				let x = this.directions[i][0]
				let y = this.directions[i][1]
				if (( x > 2 && x < matrix[0].length - 2) && (y > 2 && y < matrix.length - 2)) {
					for (var i in grassArr) {
						if (x == grassArr[i].x && y == grassArr[i].y) {
							grassArr.splice(i, 1);
							break;
						}
					}
					fireArr[i] = new Fire(x, y);
				}
			}
			this.fire = 0;
		}
	}
}