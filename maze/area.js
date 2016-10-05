class Area {
    constructor(wall, ground, size, wallSize) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = wallSize * size;
        this.canvas.height = wallSize * size;
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.wall = wall;
        this.ground = ground;
        this.sizes = size; //sizes is number of squares in a row
        this.wallSize = wallSize;
        this.array = [];
        for (let i = 0; i < size; i++) {
            this.array[i] = [];
            for (let j = 0; j < size; j++) {
                this.array[i][j] = ground;
            }
        }
    }

    toPx(num) {
        return num * this.wallSize;
    }
    fromPx(num) {
        return num / this.wallSize;
    }

    draw() {
        for (let y = 0; y < this.sizes; y++) {
            for (let x = 0; x < this.sizes; x++) {
                this.context.fillStyle = this.array[y][x];
                this.context.fillRect(this.toPx(x), this.toPx(y), this.wallSize, this.wallSize);
            }
        }
    }
    update() {
        this.context.clearRect(0,0, this.toPx(this.sizes), this.toPx(this.sizes));
        this.draw();
    }

    getAt(x, y) {
        return this.array[y][x];
    }
    setAt(x, y, color) {
        this.array[y][x] = color;
        //this.update(); - program was very slow because of this
    }
}