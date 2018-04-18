import Phaser from 'phaser'
import {centerGameObjects} from '../utils'

export default class extends Phaser.State {
    init() {}

    preload() {
        // load images
        this.load.image('splash', 'assets/images/splash.png');
        this.load.image('background', 'assets/images/background.png');

        // load audio
        this.load.audio('cakeSlayerThemeLoop', 'assets/sounds/cakeSlayerThemeLoop.wav');
    }

    create() {
        // set the background
        let background = this.add.image(this.world.centerX, this.world.centerY, 'splash');
        background.anchor.setTo(0.5);

        // loop the music
        this.themeMusic = game.add.audio('cakeSlayerThemeLoop');
        //this.themeMusic.play();

        let enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.addOnce(this.resetGame, this);
    }

    resetGame() {
        this.themeMusic.stop();
        this.state.start('Splash');
    }
}
