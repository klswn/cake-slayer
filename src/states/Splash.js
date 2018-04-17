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
        //
        // load your assets
        //
        this.load.image('boss', 'assets/images/cakeBoss.png');
        this.load.spritesheet('boss2', 'assets/images/cakeBoss2.png', 64, 64);
        this.load.spritesheet('player', 'assets/images/greenMarioSprite.png', 256, 256);
    }

    create() {
        this.state.start('Game');
    }
}
