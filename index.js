window.onload = () => {
    let area = new Area("steelblue", "wheat", 51, 10);
    let gen = new Generator(area, "yellowgreen", "red");
    gen.generate();
    area.draw();
}