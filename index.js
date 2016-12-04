window.onload = () => {
    let area = new Area("steelblue", "wheat", new Coords(57, 57), new Coords(10, 10));
    let gen = new Generator(area, "yellowgreen", "red");
    let game = new Game(area, "red", "orange", new Coords(0, 1));
    let solver = new Solver(game, "blue");

    document.getElementById("maze").appendChild(area.canvas);
    document.getElementById("generate").onclick = () => {
            area.restart();
            gen.generate();
            game.start();
            area.draw();
        }
        //display controls
    document.getElementById("solve").onclick = () => {
        solver.solve();
    }
    document.getElementById("up").onclick = () => {
        game.move(new Coords(0, -1));
    }
    document.getElementById("down").onclick = () => {
        game.move(new Coords(0, 1));
    }
    document.getElementById("right").onclick = () => {
        game.move(new Coords(1, 0));
    }
    document.getElementById("left").onclick = () => {
            game.move(new Coords(-1, 0));
        }
    //keyboard controls
    document.documentElement.onkeydown = function(e) {
        switch (e.keyCode) {
            case 37:
                // left arrow
                game.move(new Coords(-1, 0));
                break;
            case 38:
                // up arrow
                game.move(new Coords(0, -1));
                break;
            case 39:
                // right arrow
                game.move(new Coords(1, 0));
                break;
            case 40:
                // down arrow
                game.move(new Coords(0, 1));
                break;;
        }
    };

    gen.generate();
    game.start();
    area.draw();
}
