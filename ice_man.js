module.exports = class IceMan{
    constructor(x, y){
        this.x = x;
        this.y = y;
        
        this.body = [
         [this.x, this.y],
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



    move() {
        let inputDirection = { x: 0, y: 0 }
        let lastInputDirection = { x: 0, y: 0 }
        
        window.addEventListener('keydown', e => {
           switch (e.key) {
              case 'ArrowUp':
                 if (lastInputDirection.y !== 0) break
                 inputDirection = { x: 0, y: -1 }
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
        
        export function getInputDirection() {
           lastInputDirection = inputDirection
           return inputDirection
        }
    }
}