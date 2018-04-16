/* globals __DEV__ */
import Phaser from 'phaser'
import Boss from '../sprites/Boss'

export default class extends Phaser.State {
    init() {}
    preload() {}

    create() {
        const bannerText = 'CAKE SLAYER '
        let banner = this.add.text(this.world.centerX, 80, bannerText, {
            font: '50px Bangers',
            fill: '#DC143C',
            smoothed: true
        })

        banner.padding.set(100)
        banner.anchor.setTo(0.5)

        this.boss = new Boss({
            game: this.game,
            x: this.world.width - 150,
            y: this.world.height - 150,
            asset: 'boss'
        })

        this.game.add.existing(this.boss)
    }

    render() {
        if (__DEV__) {
            //this.game.debug.spriteInfo(this.boss, 32, 32)
        }
    }
}
