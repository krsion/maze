class Game {
    constructor(area, cursor, visited, position) {
        this.area = area;
        this.cursor = cursor;
        this.defaultPos = position;
        this.visited = visited;
        this.position = position;
        /*
            TODO: Controls
        */
    }
    start() {
        this.position = this.defaultPos;
        this.area.setAt(this.position, this.cursor);
    }
    move(coords) {
        let newPos = new Coords(this.position.x + coords.x, this.position.y + coords.y);
        if (this.area.getAt(newPos) !== this.area.wall) {
            this.area.setAt(this.position, this.visited);
            this.position = newPos;
            this.area.setAt(this.position, this.cursor);
            this.area.update();
            if (this.position.x === this.area.sizes.x - 1 && this.position.y === this.area.sizes.y - 2) {
                this.area.context.fillStyle = "red";
                this.area.context.font = "20px Arial";
                this.area.context.fillText("You won!", 20, 20);
                console.log("JOO");
            }
        }
    }
}
