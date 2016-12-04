class Generator {
    constructor(area, base, cursor) {
        this.area = area;
        this.cursor = cursor;
        this.base = base;
        this.bases = []; //list of Coords where the bases are
    }
    prepare() {
        this.bases = [];
        let x = this.area.sizes.x;
        let y = this.area.sizes.y;
        //sidewalls
        for (let i = 0; i < y; i++) {
            for (let j = 0; j < x; j++) {
                if (j === 0 || i === 0 || j === x - 1 || i === y - 1) {
                    this.area.setAt(new Coords(j, i), this.area.wall);
                }
            }
        }
        //bases
        for (let i = 2; i < y - 1; i += 2) {
            for (let j = 2; j < x - 1; j += 2) {
                let pos = new Coords(j, i);
                this.bases.push(pos);
                this.area.setAt(pos, this.base);
            }
        }
        //initial and final point
        this.area.setAt(new Coords(0, 1), this.area.ground);
        this.area.setAt(new Coords(x - 1, y - 2), this.area.ground);
    }
    buildWall() {
        let dir = Math.floor(Math.random() * 4);
        let bai = Math.floor(Math.random() * this.bases.length);
        let base = this.bases[bai];
        while (true) {
            if (this.area.getAt(base) !== this.area.wall) {
                if (this.area.getAt(base) === this.base) {
                    let index = this.bases.findIndex(a => a.x === base.x && a.y === base.y)
                    this.bases.splice(index, 1);
                }
                this.area.setAt(base, this.area.wall);
            }
            else break;
            switch (dir)
            {
                case 0: base.x--; break;
                case 1: base.x++; break;
                case 2: base.y--; break;
                case 3: base.y++; break;
            }
        }
    }
    generate() {
        this.prepare();
        let bases = this.bases.length;
        while(bases > 0) {
            this.buildWall();
            bases = this.bases.length;
        }
    }
}
