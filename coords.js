class Coords {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    equals(coords) {
        return (this.x === coords.x && this.y === coords.y);
    }
}
