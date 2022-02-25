import Food from './Food'
import Snake from './Snake'
import ScorePanel from './ScorePanel'
import Mask from './Mask'

import GameStatus from '../enum/GameStatus'
import Direction from '../enum/Direction'

class Game {

    private stage_element!: HTMLElement

    private stage_width!: number
    private stage_height!: number

    private _game_status: GameStatus = GameStatus.STOP
    private curr_direction: Direction = Direction.NONE
    

    private snake!: Snake
    private food!: Food
    private scorePanel!: ScorePanel
    private _mask!: Mask

    private upLevelScore: Array<number> = [5,15,25,35,45,55,75,95,120,150, 300]
    private speedList: Array<number> = [150, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10]

    constructor() {}

    init() {

        this.stage_element = document.querySelector('#stage')!
        const { width: stage_width, height: stage_height } = this.stage_element.getBoundingClientRect()

        // 获取舞台的宽高
        this.stage_width = stage_width - 4
        this.stage_height = stage_height - 4

        // 初始化：计分板、蛇、食物以及遮罩层
        this.scorePanel = new ScorePanel()
        this.snake = new Snake()
        this.food = new Food(this.stage_width - 10, this.stage_height - 10)
        this.mask = new Mask()

        // 开始监听用户键盘
        window.addEventListener('keydown', this.keydownHandler.bind(this))
        

    }

    // 用户键盘监听
    keydownHandler(e: KeyboardEvent) {
        const { code } = e
        switch(this._game_status) {
            case GameStatus.PLAY:
                this.snake.changeHeadDirection(code)
                switch(code) {
                    case 'ArrowUp':
                    case 'KeyW':
                        this.curr_direction = Direction.UP
                        break
                    case 'ArrowRight':
                    case 'KeyD':
                        this.curr_direction = Direction.RIGHT
                        break
                    case 'ArrowDown':
                    case 'KeyS':
                        this.curr_direction = Direction.DOWN
                        break
                    case 'ArrowLeft':
                    case 'KeyA':
                        this.curr_direction = Direction.LEFT
                        break
                    case 'Space':
                        this._game_status = GameStatus.PAUSE
                        this.mask.showMask()
                        this.mask.showContinueBtn()
                        this.mask.showRestartBtn()
                        break
                }
                break
            case GameStatus.PAUSE:
                switch(code) {
                    case 'Space':
                        this._game_status = GameStatus.PLAY
                        this.mask.hideMask()
                        break
                }
                break
        }
    }

    // 开始运行游戏
    run() {
        if(this.game_status === GameStatus.PLAY) {


            const { x, y, width, height } = this.snake
            let gameOver = ( this.curr_direction === Direction.LEFT && x <= 0 ) ||
                                 ( this.curr_direction === Direction.RIGHT && x >= this.stage_width - width ) ||
                                 ( this.curr_direction === Direction.UP && y <= 0 ) ||
                                 ( this.curr_direction === Direction.DOWN && y >= this.stage_height - height )
                                 console.log('gameOver',gameOver)
            if(gameOver) {
                this.curr_direction = Direction.NONE
                this._game_status = GameStatus.STOP
                this.mask.showMask()
                this.mask.showRestartBtn()
            } else {
    
                this.snake.moveBody()

                switch(this.curr_direction) {
                    case Direction.UP:
                        this.snake.moveUp()
                        break
                    case Direction.RIGHT:
                        this.snake.moveRight()
                        break
                    case Direction.DOWN:
                        this.snake.moveDown()
                        break
                    case Direction.LEFT:
                        this.snake.moveLeft()
                        break
                }
        
                const { x: snake_x, y: snake_y } = this.snake
                const { x: food_x, y: food_y } = this.food
                if(snake_x === food_x && snake_y === food_y) {
                    this.eatFoodHandler()
                }
                
            }
        }

        if(this.snake.speed < this.speedList.length) {
            setTimeout(() => this.run(), this.speedList[this.snake.speed])
        } else {
            setTimeout(() => this.run(), this.speedList[this.speedList.length - 1])
        }
    }

    // 蛇吃到食物的处理
    eatFoodHandler() {
        this.scorePanel.addScore()
        this.snake.addBody()
        this.food.reset()

        this.checkUpLevel()
    }

    checkUpLevel() {
        if(this.upLevelScore.includes(this.scorePanel.score)) {
            this.scorePanel.upLevel()
            this.snake.upSpeed()
        }
    }

    // 重置游戏
    restart() {
        this.scorePanel.reset()
        this.food.reset()
        this.snake.reset()
        this.game_status = GameStatus.PLAY
        this.curr_direction = Direction.NONE
    }



    get game_status(): GameStatus { return this._game_status }
    get mask(): Mask { return this._mask }

    set game_status(s: GameStatus) { this._game_status = s }
    set mask(mask: Mask) { this._mask = mask }
}

export default Game