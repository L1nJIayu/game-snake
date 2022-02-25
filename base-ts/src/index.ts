

import './styles/common.scss'
import './iconfont/iconfont.css'

import Game from './modules/Game'
import GameStatus from './enum/GameStatus'



let game = new Game()
game.init()



// 开始
document.querySelector('#start-game-btn')!.addEventListener('click', () =>{
    game.run()

    game.game_status = GameStatus.PLAY
    game.mask.hideMask()
})

// 继续
document.querySelector('#continue-game-btn')!.addEventListener('click', () =>{
    game.game_status = GameStatus.PLAY
    game.mask.hideMask()
})

// 重新开始
document.querySelector('#restart-game-btn')!.addEventListener('click', () =>{
    game.restart()
    game.mask.hideMask()
})

