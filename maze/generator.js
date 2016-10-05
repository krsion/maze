class Generator {
    constructor(area, base, cursor) {
        this.area = area;
        this.cursor = cursor;
        this.base = base;
    }
    //reduced repeating thx to this function
    forAllBases(func) {
        let x = this.area.sizes.x;
        let y = this.area.sizes.y;
        //need to use break in one func, did it via return bool value
        let again = true;
        for (let i = 2; i < y - 1; i += 2) {
            for (let j = 2; j < x - 1; j += 2) {
                if (again === false) {
                    break;
                }
                //func needs indexes as arguments
                again = func(new Coords(j, i));
            }
        }
    }
    prepare() {
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
        this.forAllBases((pos) => {
            this.area.setAt(pos, this.base);
            return true;
        });
        //initial and final point
        this.area.setAt(new Coords(0, 1), this.area.ground);
        this.area.setAt(new Coords(x - 1, y - 2), this.area.ground);
    }
    countBases() {
        let index = 0;
        this.forAllBases((pos) => {
            if (this.area.getAt(pos) === this.base) {
                index += 1;
            }
            return true;
        });
        return index;
    }
    randomBase() {
        let num = Math.floor(Math.random() * this.countBases() + 1);
        let index = 0;
        let xy;
        this.forAllBases((pos) => {
            if (this.area.getAt(pos) === this.base) {
                index += 1;
                if (index === num) {
                    this.area.setAt(pos, this.cursor);
                    xy = pos;
                    return false;
                }
            }
            return true;
        });
        return xy;
    }
    buildWall() {
        let dir = Math.floor(Math.random() * 4);
        let base = this.randomBase();
        while (true) {
            this.area.setAt(base, this.area.wall);
            switch (dir)
            {
                case 0: base.x--; break;
                case 1: base.x++; break;
                case 2: base.y--; break;
                case 3: base.y++; break;
            }
            if (this.area.getAt(base) !== this.area.wall)
                 this.area.setAt(base, this.area.wall);
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
