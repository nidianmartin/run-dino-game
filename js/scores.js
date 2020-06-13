class Score {
    constructor(ctx) {
        this._ctx = ctx;
        this._count = 0
    }

    draw(count) {
        this._count = count
        this._ctx.font = "bold 20px game_over";
        this._ctx.fillStyle = 'green'
        this._ctx.fillText (`Score: ${this._count}`, this._ctx.canvas.width * 0.65 ,this._ctx.canvas.height * 0.08)
    }

    scoreFinal() {
        this._ctx.font = "bold 35px game_over";
        this._ctx.fillStyle = 'black'
        this._ctx.fillText (`Score final: ${this._count}`, this._ctx.canvas.width * 0.5 ,this._ctx.canvas.height * 0.55)
    }
}