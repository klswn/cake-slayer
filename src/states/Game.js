/* globals __DEV__ */
import Phaser from 'phaser';
import Boss from '../sprites/Boss';
import CakePop from '../sprites/CakePop.js';
import Player from '../sprites/Player';

export default class extends Phaser.State {
    init() {}
    preload() {}

    create() {
        const bannerText = 'CAKE SLAYER ';
        let banner = this.add.text(this.world.centerX, 80, bannerText, {
            font: '50px Bangers',
            fill: '#DC143C',
            smoothed: true
        });

        banner.padding.set(100);
        banner.anchor.setTo(0.5);

        this.boss = new Boss({
            game: this.game,
            x: this.world.width - 150,
            y: this.world.height - 150,
            asset: 'boss2'
        });

        this.player = new Player({
            game: this.game,
            x: 150,
            y: this.world.height - 150,
            asset: 'player'
        });

        this.cakePop = new CakePop({
            game: this.game,
        });

        this.game.add.existing(this.boss);
        this.game.add.existing(this.cakePop);
        this.game.add.existing(this.player);
    }

    render() {
        if (__DEV__) {
            //this.game.debug.spriteInfo(this.boss, 32, 32)
        }
    }
}
