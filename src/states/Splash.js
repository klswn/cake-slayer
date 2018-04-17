import Phaser from 'phaser'
import {centerGameObjects} from '../utils'

export default class extends Phaser.State {
    init() {}

    preload() {
        this.loaderBg = this.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY,
            'loaderBg'
        );
        this.loaderBar = this.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY,
            'loaderBar'
        );
        centerGameObjects([this.loaderBg, this.loaderBar]);

        this.load.setPreloadSprite(this.loaderBar);

        // load assets
        this.load.image('splash', 'assets/images/splash.png');
        this.load.image('background', 'assets/images/background.png');
        this.load.spritesheet('boss', 'assets/images/cakeBoss.png', 256, 256);
        this.load.spritesheet('cakePop', 'assets/images/cakePop.png', 64, 64);
        this.load.audio('cakeSlayerLoop', 'assets/sounds/cakeSlayerLoop.wav');
        this.load.audio('cakeSlayerMusic', 'assets/sounds/cakeSlayer.wav');
        this.load.spritesheet('player', 'assets/images/greenMarioSprite.png', 256, 256);
    }

    create() {
        // set the background
        let background = this.add.image(this.world.centerX, this.world.centerY, 'splash');
        background.anchor.setTo(0.5);

        // loop the music
        let music = new Phaser.Sound(this, 'cakeSlayerLoop', 1, true);
        music.play();

        this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    }

    update() {
        if (this.enterKey.isDown || true) {
            this.state.start('Game');
        }
    }
}
