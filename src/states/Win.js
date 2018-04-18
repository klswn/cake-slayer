import Phaser from 'phaser'
import {centerGameObjects} from '../utils'

export default class extends Phaser.State {
    init() {}

    preload() {

        this.letsEatSFX = this.add.audio('letsEatSFX');
        this.letsEatSFX.volume = 2;
    }

    create() {

        // set the background
        let background = this.add.image(this.world.centerX, this.world.centerY, 'winScreen');
        background.anchor.setTo(0.5);

        this.letsEatSFX.play();

        let enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.addOnce(this.resetGame, this);
    }

    resetGame() {
        this.themeMusic.stop();
        this.state.start('Game');
    }
}
