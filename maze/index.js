window.onload = () => {
    let area = new Area("steelblue", "wheat", new Coords(21, 21), new Coords(10, 10));
    let gen = new Generator(area, "yellowgreen", "red");
    let game = new Game(area, "red");

    document.getElementById("maze").appendChild(area.canvas);
    document.getElementById("generate").onclick = () => {
        area.restart();
        gen.generate();
        //game.start();
        area.draw();
    }

    gen.generate();
    area.draw();
}
