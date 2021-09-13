class MovementAnimation {
    constructor(obj, y, speed) {
        this.obj = obj;
        this.y = y;
        this.speed = speed;
        this.done = false;
    }

    tick() {
        if (this.obj.y < this.y) {
            this.obj.position.set(this.obj.x, this.obj.y + this.speed);
        } else {
            this.obj.position.set(this.obj.x, this.y);
            this.done = true;
        }
    }
}
