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