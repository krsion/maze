class Generator {
    constructor(area, base, cursor) {
        this.area = area;
        this.cursor = cursor;
        this.base = base;
    }
    prepare() {
        let x = this.area.sizes;
        let y = this.area.sizes;
        for (let i = 0; i < y; i++) {
            for (let j = 0; j < x; j++) {
                if (j === 0 || i === 0 || j === x - 1 || i === y - 1) {
                    this.area.setAt(j, i, this.area.wall);
                }
            }
        }
        for (let i = 2; i < y - 1; i += 2) {
            for (let j = 2; j < x - 1; j += 2) {
                this.area.setAt(j, i, this.base);
            }
        }
        this.area.setAt(0, 1, this.area.ground);
        this.area.setAt(x - 1, y - 2, this.area.ground);
    }
    countBases() {
        let x = this.area.sizes;
        let y = this.area.sizes;
        let index = 0;
        for (let i = 2; i < y - 1; i += 2) {
            for (let j = 2; j < x - 1; j += 2) {
                if (this.area.getAt(j, i) === this.base) {
                    index += 1;
                }
            }
        }
        return index;
    }
    randomBase() {
        let num = Math.floor(Math.random() * this.countBases() + 1);
        let index = 0;
        let x = this.area.sizes;
        let y = this.area.sizes;
        for (let i = 2; i < y - 1; i += 2) {
            for (let j = 2; j < x - 1; j += 2) {
                if (this.area.getAt(j, i) === this.base) {
                    index += 1;
                    if (index === num) {
                        this.area.setAt(j, i, this.cursor);
                        return [j, i];
                    }
                }
            }
        }
    }
    buildWall() {
        let dir = Math.floor(Math.random() * 4);
        let xy = this.randomBase();
        let x = xy[0];
        let y = xy[1];
        while (true) {
            this.area.setAt(x, y, this.area.wall);
            switch (dir)
            {
                case 0: x--; break;
                case 1: x++; break;
                case 2: y--; break;
                case 3: y++; break;
            }
            if (this.area.getAt(x, y) !== this.area.wall)
                 this.area.setAt(x, y, this.area.wall);
            else break;
        }
    }
    generate() {
        this.prepare();
        let bases = this.countBases();
        while(bases > 0) {
            
            this.buildWall();
            bases = this.countBases();
        }
    }
}