const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let CANVAS_WIDTH = canvas.width = 800
let CANVAS_HEIGHT = canvas.height = 800

let cols = 10
let rows = 10

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

            this.current = this.next
        } 
    }
}


class Cell{
    constructor(i, j, w, h, grid){
        this.i = i
        this.j = j
        this.width = w
        this.height = h
        this.x = i * w
        this.y = j * h
        this.walls = [true, true, true, true]
        this.visited = false
        this.grid = grid.grid
        this.cols = grid.cols
        this.rows = grid.rows
        this.top
        this.right
        this.bottom
        this.left
    }

    checkNeighbors(){
        this.neighbors = []
        
        
        this.top    = this.grid[index(this.i, this.j - 1)]
        
        this.right  = this.grid[index(this.i + 1, this.j)]
    
        this.bottom = this.grid[index(this.i, this.j + 1)]

        this.left   = this.grid[index(this.i - 1, this.j)]

        if(this.top && !this.top.visited){
            this.neighbors.push(this.top)
        }
        if(this.right && !this.right.visited){
            this.neighbors.push(this.right)
        }
        if(this.bottom && !this.bottom.visited){
            this.neighbors.push(this.bottom)
        }
        if(this.left && !this.left.visited){
            this.neighbors.push(this.left)
        }

        if(this.neighbors.length > 0){
            this.r = Math.floor(Math.random() * this.neighbors.length)
            return this.neighbors[this.r]
        } else{
            return undefined
        }
    }
    
    show(){
        ctx.strokeStyle = 'white'

        ctx.beginPath()
        
        // topp
        if(this.walls[0]){
            ctx.moveTo(this.x             , this.y)
            ctx.lineTo(this.x + this.width, this.y)
            ctx.stroke()  
        }
        

        // höger
        if(this.walls[1]){
            ctx.moveTo(this.x + this.width, this.y              )
            ctx.lineTo(this.x + this.width, this.y + this.height)
            ctx.stroke()  
        }
        

        // botten
        if(this.walls[2]){
            ctx.moveTo(this.x + this.width, this.y + this.height)
            ctx.lineTo(this.x, this.y + this.height             )
            ctx.stroke() 
        }
        

        // vänster
        if(this.walls[3]){
            ctx.moveTo(this.x, this.y + this.height)
            ctx.lineTo(this.x, this.y              )
            ctx.stroke()
        }

        // visited
        if(this.visited){
            ctx.fillStyle = 'purple'
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }

    mark(){
        ctx.fillStyle = 'DarkSlateBlue'
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

const grid = new Grid(CANVAS_WIDTH, CANVAS_HEIGHT, cols, rows)

grid.drawGrid()

const fps = 5

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