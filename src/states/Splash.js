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
        this.load.spritesheet('cakePop', 'assets/images/cakePop.png', 37, 36);
        this.load.audio('cakeSlayerLoop', 'assets/sounds/cakeSlayerLoop.wav');
        this.load.spritesheet('player', 'assets/images/greenMarioSprite.png', 256, 256);
    }

    create() {
        this.state.start('Game');
    }
}
