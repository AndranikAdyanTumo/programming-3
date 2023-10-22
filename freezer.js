module.exports = class Freezer{
	constructor(x, y){
		this.x = x;
		this.y = y;
	
		this.body = {
			center: [this.x, this.y],
			leftUp: [this.x - 1, this.y - 1],
			up: [this.x, this.y - 1],
			rightUp: [this.x + 1, this.y - 1],
			left: [this.x - 1, this.y],
			right: [this.x + 1, this.y],
			leftDown: [this.x - 1, this.y + 1],
			down: [this.x, this.y + 1],
			rightDown: [this.x + 1, this.y + 1],
		};

	}


	move() {
		let inputDirection = { x: 0, y: 0 }
		let lastInputDirection = { x: 0, y: 0 }
		
		window.addEventListener('keydown', e => {
			console.log(e.key);

			switch (e.key) {
				case 'KeyW':
					matrix[this.body.leftDown[1]][this.body.leftDown[0]] = 0;//7
					matrix[this.body.down[1]][this.body.down[0]] = 0;//7
					matrix[this.body.rightDown[1]][this.body.rightDown[0]] = 0;//7
					
					matrix[this.body.leftDown[1] - 3][this.body.leftDown[0]] = 6;
					matrix[this.body.down[1] - 3][this.body.down[0]] = 6;
					matrix[this.body.rightDown[1] - 3][this.body.rightDown[0]] = 6;

					console.log(matrix);
					
					break
				case 'ArrowDown':
					if (lastInputDirection.y !== 0) break
					inputDirection = { x: 0, y: 1 }
					break
				case 'ArrowLeft':
					if (lastInputDirection.x !== 0) break
					inputDirection = { x: -1, y: 0 }
					break
				case 'ArrowRight':
					if (lastInputDirection.x !== 0) break
					inputDirection = { x: 1, y: 0 }
					break
			}
		})
		
		function getInputDirection() {
			lastInputDirection = inputDirection
			return inputDirection
		}
	}
}