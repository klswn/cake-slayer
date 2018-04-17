import Phaser from 'phaser';

export default class extends Phaser.Sprite {
    constructor({game, x, y, angle, asset}) {
        super(game, x, y, asset);

        // enable physics
        game.physics.enable(this);

        // physics values
        this.body.collideWorldBounds = false;
        this.body.setSize(14, 12, 12, 12);

        // display values
        this.anchor.setTo(0.5);
        this.scale.setTo(3, 3);

        // sprite animation
        this.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7], true);
        this.animations.play('move', 10, true);

        // movement
        this.body.moveTo(1500, -1000, angle);
    }

    update() {}
}
