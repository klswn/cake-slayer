import Phaser from 'phaser';

export default class extends Phaser.Sprite {
    constructor({game, x, y, angle, asset}) {
        super(game, x, y, asset);
        game.physics.enable(this);
        this.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7], true);
        this.body.collideWorldBounds = false;
        this.anchor.setTo(0.5);
        this.scale.setTo(3, 3);
        this.animations.play('move', 10, true);
        this.body.moveTo(1500, -1000, angle);
    }

    update() {}
}
