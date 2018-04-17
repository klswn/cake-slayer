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
        this.load.image('background', 'assets/images/background.png');
        this.load.spritesheet('boss', 'assets/images/cakeBoss.png', 64.1, 64);
        this.load.spritesheet('cakePop', 'assets/images/cakePop.png', 36.2, 36);
        this.load.audio('cakeSlayerLoop', 'assets/sounds/cakeSlayerLoop.wav');
    }

    create() {
        this.state.start('Game');
    }
}
