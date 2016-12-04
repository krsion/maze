class Area {
    constructor(wall, ground, sizes, wallSizes) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = wallSizes.x * sizes.x;
        this.canvas.height = wallSizes.y * sizes.y;
        this.context = this.canvas.getContext("2d");

        this.wall = wall;
        this.ground = ground;
        this.sizes = sizes; //numbers of squares in a row and column
        this.wallSizes = wallSizes;
        this.array = [];
        for (let i = 0; i < sizes.y; i++) {
            this.array[i] = [];
            for (let j = 0; j < sizes.x; j++) {
                this.array[i][j] = ground;
            }
        }
    }
    toPx(coords) {
        return new Coords(coords.x * this.wallSizes.x, coords.y * this.wallSizes.y);
    }
    fromPx(coords) {
        return new Coords(coords.x / this.wallSizes.x, coords.y / this.wallSizes.y);
    }

    draw() {
        for (let y = 0; y < this.sizes.y; y++) {
            for (let x = 0; x < this.sizes.x; x++) {
                this.context.fillStyle = this.array[y][x];
                let inPx = this.toPx(new Coords(x, y));
                this.context.fillRect(inPx.x, inPx.y, this.wallSizes.x, this.wallSizes.x);
            }
        }
    }
    restart() {
        let inPx = this.toPx(this.sizes);
        this.context.clearRect(0,0, inPx.x, inPx.y);
        this.array = [];
        for (let i = 0; i < this.sizes.y; i++) {
            this.array[i] = [];
            for (let j = 0; j < this.sizes.x; j++) {
                this.array[i][j] = this.ground;
            }
        }
    }
    update() {
        this.context.clearRect(0,0, this.toPx(this.sizes), this.toPx(this.sizes));
        this.draw();
    }

    getAt(position) {
        return this.array[position.y][position.x];
    }
    setAt(position, color) {
        this.array[position.y][position.x] = color;
    }
}
