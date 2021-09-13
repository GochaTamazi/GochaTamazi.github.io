class Config {
    static fieldSize = 6;   // Field size in cells
    static dotSize = 30;    // Dot size in pixels
    static margin = 15;     // Distance between dots in pixels
    static lineSize = 30;   // Dots connection line size
    static backgroundColor = 0xffffff;
    static dotColors = [
        0xddd01f, //yellow
        0x81b2fe, //blue
        0x82e08a, //green
        0xe65d42, //red
        0x8e5dab  //purple
    ];

    static getRandColors() {
        let i = Math.floor(Math.random() * Config.dotColors.length);
        return Config.dotColors[i];
    }
}
