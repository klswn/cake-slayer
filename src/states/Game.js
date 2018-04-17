/* globals __DEV__ */
import Phaser from 'phaser';
import Boss from '../sprites/Boss';
import CakePop from '../sprites/CakePop.js';

export default class extends Phaser.State {
    init() {}
    preload() {}

    create() {
        let background = this.add.image(this.world.centerX, this.world.centerY, 'background');
        const bannerText = 'CAKE SLAYER ';
        let banner = this.add.text(this.world.centerX, 40, bannerText, {
            font: '50px Bangers',
            fill: '#DC143C',
            smoothed: true
        });

        banner.padding.set(100);
        banner.anchor.setTo(0.5);
        background.anchor.setTo(0.5);

        this.boss = new Boss({
            game: this.game,
            x: this.world.width - 100,
            y: this.world.height,
            asset: 'boss',
        });

        this.game.add.existing(this.boss);
        this.game.time.events.loop(Phaser.Timer.SECOND * 3, this.fireCakePop, this);
    }

    fireCakePop() {
        this.cakePop = new CakePop({
            game: this.game,
            x: this.boss.x - 64,
            y: this.boss.y - this.getRandomNumber(0, 64),
            angle: this.getRandomNumber(-10, 20),
            asset: 'cakePop',
        });

        this.game.add.existing(this.cakePop);
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    update() {

    }

    render() {
        if (__DEV__) {
            //this.game.debug.spriteInfo(this.boss, 32, 32)
        }
    }
}
