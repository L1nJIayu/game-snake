class Mask {
    private mask_element: HTMLElement
    private start_button: HTMLElement
    private restart_button: HTMLElement
    private continue_button: HTMLElement

    constructor() {
        this.mask_element = document.querySelector('#mask')!
        this.continue_button = document.querySelector('#continue-game-btn')!
        this.restart_button = document.querySelector('#restart-game-btn')!
        this.start_button = document.querySelector('#start-game-btn')!
    }

    showMask() { this.mask_element.style.visibility = 'visible' }
    hideMask() {
        this.mask_element.style.visibility = 'hidden'
        this.hideContinueBtn()
        this.hideRestartBtn()
        this.hideStartBtn()
    }

    showStartBtn() { this.start_button.style.display = 'block' }
    hideStartBtn() { this.start_button.style.display = 'none' }

    showRestartBtn() { this.restart_button.style.display = 'block' }
    hideRestartBtn() { this.restart_button.style.display = 'none' }
    
    showContinueBtn() { this.continue_button.style.display = 'block' }
    hideContinueBtn() { this.continue_button.style.display = 'none' }

}

export default Mask