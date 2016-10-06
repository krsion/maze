window.onload = () => {
    let area = new Area("steelblue", "wheat", new Coords(25, 25), new Coords(10, 10));
    let gen = new Generator(area, "yellowgreen", "red");
    let game = new Game(area, "red", "orange", new Coords(0, 1));
    let solver = new Solver(game);

    document.getElementById("maze").appendChild(area.canvas);
    document.getElementById("generate").onclick = () => {
        area.restart();
        gen.generate();
        game.start();
        area.draw();
    }
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

    gen.generate();
    game.start();
    area.draw();
}
