class Score {
    constructor(ctx) {
        this._ctx = ctx;
        this._count = 0
    }

    draw(count) {
        this._count = count
        this._ctx.font = "20px Games";
        this._ctx.fillStyle = '#117A65'
        this._ctx.fillText (`Score: ${this._count}`, this._ctx.canvas.width * 0.65 ,this._ctx.canvas.height * 0.08)
    }

    scoreFinal() {
        this._ctx.font = "30px Games";
        this._ctx.fillStyle = 'black'
        this._ctx.fillText (`Score final: ${this._count}`, this._ctx.canvas.width * 0.5 ,this._ctx.canvas.height * 0.55)
    }
}

class Healt extends Score {
    constructor(ctx) {
        super(ctx) 
    }
    draw(count) {
        this._count = count
        this._ctx.font = "20px Games";
        this._ctx.fillStyle = '#117A65'
        this._ctx.fillText (`Health: ${this._count}`, this._ctx.canvas.width * 0.1 ,this._ctx.canvas.height * 0.08)
    }
}