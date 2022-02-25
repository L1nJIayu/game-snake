class Snake {

    private snake_element: HTMLElement
    private snake_head: HTMLElement
    private snake_body: Array<HTMLElement> = []
    private _step: number = 10  // 步长（蛇每移动一次的距离）
    private _speed: number = 0 // 蛇的速度

    private _x: number = 150
    private _y: number = 150
    private _width: number
    private _height: number

    constructor() {
        this.snake_element = document.querySelector('#snake')!
        this.snake_head = document.querySelector('#snake > div')!
        const { offsetLeft, offsetTop, clientWidth, clientHeight } = this.snake_head
        this.x = offsetLeft
        this.y = offsetTop
        this._width = clientWidth
        this._height = clientHeight

        
    }

    // 蛇头的方向
    changeHeadDirection(keycode: string) {

        switch(keycode) {
            case 'ArrowUp':
            case 'KeyW':
                this.snake_head.style.transform = 'rotate(0deg)'
                break
            case 'ArrowRight':
            case 'KeyD':
                this.snake_head.style.transform = 'rotate(90deg)'
                break
            case 'ArrowDown':
            case 'KeyS':
                this.snake_head.style.transform = 'rotate(180deg)'
                break
            case 'ArrowLeft':
            case 'KeyA':
                this.snake_head.style.transform = 'rotate(-90deg)'
                break
        }
    }

    // 加速
    upSpeed() {
        this.speed++   
    }
    
    /* 移动 */
    moveUp() {
        this.y -= this._step
        this.snake_head.style.top = this.y + 'px'
    }
    moveRight() {
        this.x += this._step
        this.snake_head.style.left = this.x + 'px'
    }
    moveDown() {
        this.y += this._step
        this.snake_head.style.top = this.y + 'px'
    }
    moveLeft() {
        this.x -= this._step
        this.snake_head.style.left = this.x + 'px'
    }

    // 增加身体
    addBody() {
        let bodyDOM = document.createElement('div')
        bodyDOM.className = 'snake-body iconfont icon-snake-body-2'

        // 新的身体的位置设置
        if(this.snake_body.length === 0) {  // 还没有身体的情况
            bodyDOM.style.left = this.x + 'px'
            bodyDOM.style.top = this.y + 'px'
        } else {    // 已经有至少一个身体的情况
            let last_body = this.snake_body[this.snake_body.length - 1]
            let x: string = last_body.style.left
            let y: string = last_body.style.top
            bodyDOM.style.left = x
            bodyDOM.style.top = y
        }

        this.snake_body.push(bodyDOM)
        this.snake_element!.appendChild(bodyDOM)
    }
    // 移动身体
    moveBody() {
        if(this.snake_body.length !== 0) {
            for(let i = this.snake_body.length - 1; i >= 0; i--) {
                let _target_body = this.snake_body[i]
                if(i === 0) {
                    _target_body.style.left = this.x + 'px'
                    _target_body.style.top = this.y + 'px'
                } else {
                    _target_body.style.left = this.snake_body[i - 1].style.left
                    _target_body.style.top = this.snake_body[i - 1].style.top
                }
            }
        }
    }

    // 重置
    reset() {
        this.snake_body = []
        this.snake_element!.innerHTML = ''
        this.speed = 0
        this.x = 150
        this.y = 150

        this.snake_head = document.createElement('div')
        this.snake_head.className = 'snake-head iconfont icon-snake-head-1'
        this.snake_head.style.left = this.x + 'px'
        this.snake_head.style.top = this.y + 'px'
        this.snake_element.appendChild(this.snake_head)
    }

    get x(): number { return this._x }
    get y(): number { return this._y }
    get width() { return this._width }
    get height() { return this._height }
    get speed(): number { return this._speed }

    set speed(s: number) { this._speed = s }
    set x(x: number) { this._x = x }
    set y(y: number) { this._y = y }
}

export default Snake