window.onload = () => {
    let area = new Area("steelblue", "wheat", 25, 10);
    let gen = new Generator(area, "yellowgreen", "red");

    document.getElementById("maze").appendChild(area.canvas);
    document.getElementById("generate").onclick = () => {
        area.restart();
        gen.generate();
        area.draw();
    }

    gen.generate();
    area.draw();
}
