const LivingCreature = require("./livingCreature")

module.exports = class Fire extends LivingCreature {
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
		return super.chooseCell(character);
	}

	mul() {
		var found = this.chooseCell(0);
		var newCell = this.random(found);
		var newX = newCell[0];
		var newY = newCell[1];
		matrix[newY][newX] = 7;
		fireArr.push(new Fire(newX, newY));
		}

	eat() {
		var found = this.chooseCell(1);
		const newCell = this.random(found);

		if (newCell) {
			var newX = newCell[0];
			var newY = newCell[1];
			matrix[newY][newX] = 7;
			matrix[this.y][this.x] = 0;

			this.x = newX;
			this.y = newY;

			for (var i in grassArr) {
				if (newX == grassArr[i].x && newY == grassArr[i].y) {
					grassArr.splice(i, 1);
					break;
				}
			}

			this.mul();

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
			matrix[newY] [newX] = 7;

			matrix[this.y] [this.x] = 0;

			this.x = newX;
			this.y = newY;
		}
		this.die();
	}

	die() {
		for (var i in fireArr) {
			if (this.x == fireArr[i].x && this.y == fireArr[i].y) {
				fireArr.splice(i, 1);
				break;
			}
		}
		matrix[this.y] [this.x] = 0;
	}
}