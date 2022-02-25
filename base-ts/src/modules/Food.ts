
class Food {

    private _x: number = 0
    private _y: number = 0

    private _stage_x_max: number = 0
    private _stage_y_max: number = 0

    private _element: HTMLElement = document.createElement('div')

    constructor(stage_x_max: number, stage_y_max: number) {
        this.stage_x_max = stage_x_max
        this.stage_y_max = stage_y_max
        this.init()
    }

    init() {
        this.x = Math.round(Math.random() * (this.stage_x_max / 10)) * 10
        this.y = Math.round(Math.random() * (this.stage_y_max / 10)) * 10

        this.element = document.createElement('div')
        this.element.className = 'food'
        this.element.appendChild(document.createElement('div'))
        this.element.appendChild(document.createElement('div'))
        this.element.appendChild(document.createElement('div'))
        this.element.appendChild(document.createElement('div'))
        this.element.style.left = this.x + 'px'
        this.element.style.top = this.y + 'px'

        
        const stageDOM = document.querySelector('#stage')!
        stageDOM.appendChild(this.element)
    }

    reset() {
        this.x = Math.round(Math.random() * (this.stage_x_max / 10)) * 10
        this.y = Math.round(Math.random() * (this.stage_y_max / 10)) * 10
        this.element.style.left = this.x + 'px'
        this.element.style.top = this.y + 'px'
    }

    get x(): number { return this._x }
    get y(): number { return this._y }
    get stage_x_max(): number { return this._stage_x_max }
    get stage_y_max(): number { return this._stage_y_max }
    get element(): HTMLElement { return this._element }


    set x(x: number) { this._x = x }
    set y(y: number) { this._y = y }
    set stage_x_max(max: number) { this._stage_x_max = max}
    set stage_y_max(max: number) { this._stage_y_max = max} 
    set element(e: HTMLElement) { this._element = e }
    
}

export default Food