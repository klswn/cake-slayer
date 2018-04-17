import Phaser from 'phaser';

export default class extends Phaser.Sprite {
    constructor({game, x, y, asset}) {
        super(game, x, y, asset);

        // enable physics
        game.physics.enable(this);

        // physics values
        this.body.collideWorldBounds = false;
        this.body.setSize(220, 225, 65, 15);
        this.direction = -1;

        // display values
        this.anchor.setTo(0.5);
        this.scale.setTo(0.85, 0.85);

        // sprite animation
        this.animations.add('move', [0, 1, 2, 3, 4, 5], true);
        this.animations.play('move', 10, true);
    }

    update() {}
}
