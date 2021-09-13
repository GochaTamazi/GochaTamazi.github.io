class Game {
    constructor() {
        this.animationPlay = false;     // If the animation is currently playing
        this.maxDist = Config.dotSize * 2 + Config.margin * 2;    // Maximum length of dots connection
        this.dotsQueue = [];    // list of connected Dots
        this.linesQueue = [];   // list of connections of these Dots
        this.score = 0;     // The game score
        this.LMB = false;   // if the left mouse button down
        let fieldLength = (Config.dotSize + Config.margin) * Config.fieldSize * 2;   // Field size in pixels

        delete PIXI.Renderer.__plugins.interaction;

        this.application = new PIXI.Application({
            width: fieldLength + 100,
            height: fieldLength + 100,
            backgroundColor: 0x999999,
            antialias: true,
            autoDensity: true,
            resolution: 2
        });
        document.body.appendChild(this.application.view);

        if (!('events' in this.application.renderer)) {
            this.application.renderer.addSystem(PIXI.EventSystem, 'events');
        }

        this.application.stage.interactive = true;
        this.application.stage.hitArea = this.application.renderer.screen;

        this.fieldBg = new PIXI.Graphics();
        this.fieldBg.beginFill(Config.backgroundColor);
        this.fieldBg.drawRect(0, 0, fieldLength, fieldLength);
        this.fieldBg.x = (this.application.screen.width - fieldLength) / 2;
        this.fieldBg.y = (this.application.screen.height - fieldLength) / 2;
        this.fieldBg.endFill();

        this.fieldBg.interactive = true;
        this.fieldBg.hitArea = this.application.renderer.screen;
        this.fieldBg.name = "fieldBg";

        this.application.stage.addChild(this.fieldBg);

        let basicText = new PIXI.Text('POINTS: 00000');
        basicText.x = fieldLength - 150;
        this.application.stage.addChild(basicText);
        this.scoreBasicText = basicText;

        this.field = new Field(this);
        let game = this;

        this.application.stage.addEventListener('mousedown', (e) => {
            game.onMousedown(e);
        });
        this.application.stage.addEventListener('mouseup', (e) => {
            game.onMouseup(e);
        });
        this.application.stage.addEventListener('mousemove', (e) => {
            game.onMousemove(e);
        });
        this.application.stage.addEventListener('mouseover', (e) => {
            game.onMouseover(e);
        });
        this.application.ticker.add(this.ticker, this);
    }

    onMousedown(e) {
        if (this.animationPlay) {
            return;
        }
        if (e.target.name !== "Dot") {
            return;
        }
        this.LMB = true;
        let size = Config.dotSize + Config.margin;
        let x = e.target.x + size;
        let y = e.target.y + size;
        let line = new Line([x, y, e.global.x - this.fieldBg.x, e.global.y - this.fieldBg.y], Config.lineSize, e.target.Color);
        this.fieldBg.addChildAt(line, 0);
        this.linesQueue.push(line);
        this.dotsQueue.push(e.target);
    }

    onMousemove(e) {
        if (this.animationPlay) {
            return;
        }
        if (this.LMB !== true) {
            return;
        }
        if (this.linesQueue.length <= 0) {
            return;
        }
        let line = this.linesQueue[this.linesQueue.length - 1];
        line.updatePoints([null, null, e.global.x - this.fieldBg.x, e.global.y - this.fieldBg.y]);
    }

    onMouseover(e) {
        if (this.animationPlay) {
            return;
        }
        if (e.target.name !== "Dot") {
            return;
        }
        if (this.LMB !== true) {
            return;
        }
        if (this.linesQueue.length <= 0) {
            return;
        }

        let line = this.linesQueue[this.linesQueue.length - 1];

        if (e.target.Color !== line.lineColor) {
            return;
        }

        let size = Config.dotSize + Config.margin;
        let x = e.target.x + size;
        let y = e.target.y + size;
        let length = line.getDistanceToPoint(x, y);
        if (length > this.maxDist) {
            return;
        }

        if (!this.dotsQueue.includes(e.target)) {

            line.updatePoints([null, null, x, y]);
            line = new Line([x, y, e.global.x, e.global.y], Config.lineSize, e.target.Color);
            this.fieldBg.addChildAt(line, 0);
            this.linesQueue.push(line);
            this.dotsQueue.push(e.target);

        } else {

            if (this.dotsQueue.length < 2) {
                return;
            }
            let dot = this.dotsQueue[this.dotsQueue.length - 2];
            if (dot.id !== e.target.id) {
                return;
            }
            this.fieldBg.removeChild(line);
            this.linesQueue.pop();
            this.dotsQueue.pop();
            if (this.linesQueue.length <= 0) {
                return;
            }
            line = this.linesQueue[this.linesQueue.length - 1];
            line.updatePoints([null, null, e.global.x, e.global.y]);

        }
    }

    onMouseup(e) {
        if (this.animationPlay) {
            return;
        }

        this.LMB = false;

        for (let line of this.linesQueue) {
            this.fieldBg.removeChild(line);
        }
        this.linesQueue = [];

        if (this.dotsQueue.length >= 2) {
            for (let dot of this.dotsQueue) {
                this.score++;
                dot.deleted = true;
                this.fieldBg.removeChild(dot);
            }

            let str = new Array(6 - this.score.toString().length).join('0') + this.score;
            this.scoreBasicText.text = `POINTS: ${str}`

            this.field.rebaseField();
        }
        this.dotsQueue = [];
    }

    ticker(delta) {
        this.animationPlay = this.field.animatedObj.size > 0;

        for (const [key, a] of this.field.animatedObj) {
            if (a.animation) {
                if (!a.animation.done) {
                    a.animation.tick();
                } else {
                    a.animation = false;
                    this.field.animatedObj.delete(a.id);
                }
            }
        }
    }
}
