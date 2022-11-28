const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let CANVAS_WIDTH = canvas.width = 800
let CANVAS_HEIGHT = canvas.height = 800

let cols = 25
let rows = 25

class Grid{
    constructor(canvasW, canvasH, cols, rows){
        this.width = canvasW
        this.height = canvasH
        this.cols = cols
        this.rows = rows
        this.grid = []
        this.cellWidth = this.width / this.cols
        this.cellHeight = this.height / this.rows
        this.current
        this.stack = []
    }

    drawGrid(){
        for(let i = 0; i < this.cols; i++){
            for(let j = 0; j < this.rows; j++){
                this.cell = new Cell(i, j, this.cellWidth, this.cellHeight, this)
                this.grid.push(this.cell)
            }
        }

        this.current = this.grid[0]
    }

    update(){
        this.grid.forEach(e => e.show())

        this.current.visited = true
        this.current.mark()
        this.next = this.current.checkNeighbors()

        if(this.next){
            this.next.visited = true

            removeWalls(this.current, this.next)

            this.stack.push(this.current)

            this.current = this.next
        }else if(this.stack.length > 0){
            this.current = this.stack.pop()
        } 
    }
}

const grid = new Grid(CANVAS_WIDTH, CANVAS_HEIGHT, cols, rows)

grid.drawGrid()

const fps = 10

function loop(){

    grid.update()
    setTimeout(() => {
        requestAnimationFrame(loop)
    }, 1000 / fps)
}

loop()

function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
      return -1;
    }
    return (i * cols) + j;
  }

function removeWalls(a, b){
    let x = a.i - b.i

    if(x === 1){
        a.walls[3] = false
        b.walls[1] = false
    }else if(x === -1){
        a.walls[1] = false
        b.walls[3] = false
    }

    let y = a.j - b.j

    if(y === 1){
        a.walls[0] = false
        b.walls[2] = false
    }else if(y === -1){
        a.walls[2] = false
        b.walls[0] = false
    }
}