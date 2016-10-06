class Solver {
    constructor(game) {
        this.game = game;
    }
    solve() {
        let directions = [new Coords(0, -1), new Coords(0, 1), new Coords(-1, 0), new Coords(1, 0)];
        let end = new Coords(this.game.area.sizes.x - 1, this.game.area.sizes.y - 2);
        let array = this.game.area.array.slice();
        let position = this.game.position;
        let path = [position];
        while(!position.equals(end)) {
            let empty = directions.find((dir) => {
                let newPos = new Coords(position.x + dir.x, position.y + dir.y);
                return (array[newPos.y][newPos.x] === this.game.area.ground);
            });
            if (empty) {
                path.push(new Coords(position.x + empty.x, position.y + empty.y));
                console.log("ou je");
            }
            else {
                path.pop();
                console.log("ou nou");
            }
            //console.log(position);
            array[position.y][position.x] = "black";
            position = path[path.length - 1];
        }
        path.forEach((item) => {
            console.log("printing");
            this.game.area.setAt(item, this.game.visited);

        });
        console.log(position);
        this.game.area.setAt(position, this.game.cursor);
        this.game.area.update();
    }
    solvef() {
        while (!(this.game.position.x === this.game.area.sizes.x && this.game.position.y === this.game.area.sizes.y - 2)) {
            let emptys = directions.filter((dir) => {
                let newPos = new Coords(this.game.position.x + dir.x, this.game.position.y + dir.y);
                return (this.game.area.getAt(newPos) === this.game.area.ground);
            });
            console.log(directions);
            if (emptys.length > 0) {
                this.game.move(emptys[0]);
                console.log("MOVED TO EMPTY " + emptys[0]);
            }
            else {
                let visiteds = directions.filter((dir) => {
                    let newPos = new Coords(this.game.position.x + dir.x, this.game.position.y + dir.y);
                    return (this.game.area.getAt(newPos) === this.game.visited);
                });
                if (visiteds.length > 0) {
                    this.game.move(visiteds[0]);
                    console.log("MOVED TO VISITED " + visiteds[0]);
                }
                else {
                    console.log("SOME ERROR");
                    return;
                }
            }
        }
    }

}
