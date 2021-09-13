class Line extends PIXI.Graphics {
    static lastId = 0;

    constructor(points, lineWidth = 10, lineColor = "0x000000") {
        super();

        this.id = Line.lastId;
        Line.lastId++;

        this.name = "Line";

        this.points = points;
        let x1 = points[0];
        let y1 = points[1];
        let x2 = points[2];
        let y2 = points[3];

        this.lineWidth = lineWidth;
        this.lineColor = lineColor;

        this.lineStyle(lineWidth, lineColor);
        this.moveTo(x1, y1);
        this.lineTo(x2, y2);

        this.length = this.getDistance(x1, y1, x2, y2);
    }

    getDistanceToPoint(x2, y2) {
        let x1 = this.points[0];
        let y1 = this.points[1];
        return this.getDistance(x1, y1, x2, y2);
    }

    getDistance(x1, y1, x2, y2) {
        let x = x2 - x1;
        let y = y2 - y1;
        x *= x;
        y *= y;
        let s = x + y;
        return Math.sqrt(s);
    }

    updatePoints(p) {
        let points = p.map((v, i) => v || this.points[i]);
        let x1 = points[0];
        let y1 = points[1];
        let x2 = points[2];
        let y2 = points[3];

        this.clear();
        this.lineStyle(this.lineWidth, this.lineColor);
        this.moveTo(x1, y1);
        this.lineTo(x2, y2);

        this.length = this.getDistance(x1, y1, x2, y2);
        this.points = points;
    }
}
