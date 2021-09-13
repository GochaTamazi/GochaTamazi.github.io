class Dot extends PIXI.Graphics {
    static lastId = 0;

    constructor(iX, iY, color) {
        super();

        this.iX = iX;
        this.iY = iY;

        this.id = Dot.lastId;
        Dot.lastId++;

        this.name = "Dot";
        this.Color = color;

        let size = Config.dotSize + Config.margin;

        this.beginFill(this.Color, 1);
        this.drawCircle(size, size, Config.dotSize);
        this.endFill();

        this.x = iX * size * 2;
        this.y = iY * size * 2;
        this.interactive = true;
        this.buttonMode = true;

        this.deleted = false;

        this.animation = false;
    }

    createAnimation(y) {
        this.animation = new MovementAnimation(this, y, 8);
    }
}
