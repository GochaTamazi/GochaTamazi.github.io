class Field {
    constructor(game) {
        this.game = game;

        this.field = Array.from(Array(Config.fieldSize), () => new Array(Config.fieldSize));
        this.fillRandom();

        this.animatedObj = new Map();
    }

    fillRandom() {
        for (let x = 0; x < Config.fieldSize; x++) {
            for (let y = 0; y < Config.fieldSize; y++) {
                let dot = new Dot(x, y, Config.getRandColors());
                this.field[x][y] = dot;
                this.game.fieldBg.addChild(dot);
            }
        }
    }

    rebaseField() {
        for (let x = 0; x < Config.fieldSize; x++) {
            for (let y = Config.fieldSize - 1; y >= 0; y--) {
                let curDot = this.field[x][y];
                if (curDot.deleted) {
                    let upY = y - 1;
                    for (; upY >= 0; upY--) {
                        let upDot = this.field[x][upY];
                        if (!upDot.deleted) {
                            upDot.createAnimation(curDot.y);
                            curDot.y = upDot.y;
                            upDot.iY = y;
                            this.field[x][y] = upDot;
                            curDot.iY = upY;
                            this.field[x][upY] = curDot;
                            this.animatedObj.set(upDot.id, upDot);
                            break;
                        }
                    }
                }
            }
        }

        let createQueue = [];
        for (let x = 0; x < Config.fieldSize; x++) {
            createQueue[x] = [];
        }

        for (let x = 0; x < Config.fieldSize; x++) {
            for (let y = 0; y < Config.fieldSize; y++) {
                let curDot = this.field[x][y];
                if (curDot.deleted) {
                    createQueue[x].push({
                        iX: x,
                        iY: y,
                        y: curDot.y
                    });
                }
            }
        }

        for (let row of createQueue) {
            let y = 0;
            for (let col of row) {
                let dot = new Dot(col.iX, y - row.length, Config.getRandColors());
                this.field[col.iX][col.iY] = dot;
                this.game.fieldBg.addChild(dot);
                dot.createAnimation(col.y);
                this.animatedObj.set(dot.id, dot);
                y++;
            }
        }
    }
}
