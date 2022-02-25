class ScorePanel {

    private _scoreElement: HTMLElement = document.createElement('div')
    private _levelElement: HTMLElement = document.createElement('div')

    private _level: number = 1
    private _score: number = 0

    constructor() {
        this.scoreElement = document.querySelector('#score')!
        this.levelElement = document.querySelector('#level')!
    }

    addScore() {
        this.score++
        this.scoreElement.innerHTML = `${ this.score }`
    }

    upLevel() {
        if(this.level < 10) {
            this.level++
            this.levelElement.innerHTML = `${ this.level }`
        } else {
            this.levelElement.innerHTML = `max`
        }
    }

    reset() {
        this.score = 0
        this.level = 0

        this.scoreElement.innerHTML = '0'
        this.levelElement.innerHTML = '0'
    }

    get level(): number { return this._level }
    get score(): number { return this._score }
    get scoreElement(): HTMLElement { return this._scoreElement }
    get levelElement(): HTMLElement { return this._levelElement }

    set level(level: number) { this._level = level }
    set score(score: number) { this._score = score }
    set scoreElement(e: HTMLElement) { this._scoreElement = e }
    set levelElement(e: HTMLElement) { this._levelElement = e }
}

export default ScorePanel