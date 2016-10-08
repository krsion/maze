class Solver {
    constructor(game) {
        this.game = game;
    }
    solve() {
        let directions = [new Coords(0, -1), new Coords(0, 1), new Coords(-1, 0), new Coords(1, 0)];
        let end = new Coords(this.game.area.sizes.x - 1, this.game.area.sizes.y - 2);
        let array = [];
        for (let i = 0; i < this.game.area.sizes.y; i++) {
            array.push(new Array());
            for (let j = 0; j < this.game.area.sizes.x; j++) {
                array[i].push(this.game.area.array[i][j]);
            }
        }
        let position = this.game.position;
        let path = [position];
        while(!position.equals(end)) {
            let empty = directions.find((dir) => {
                let newPos = new Coords(position.x + dir.x, position.y + dir.y);
                return (array[newPos.y][newPos.x] === this.game.area.ground);
            });
            if (empty) {
                path.push(new Coords(position.x + empty.x, position.y + empty.y));
            }
            else {
                path.pop();
            }
            array[position.y][position.x] = "#ff5733";
            position = path[path.length - 1];
        }
        path.forEach((item) => {
            this.game.area.setAt(item, this.game.visited);

        });
        this.game.area.setAt(position, this.game.cursor);
        this.game.area.update();
    }
}
