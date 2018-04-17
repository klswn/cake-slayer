import Phaser from 'phaser';

export default class extends Phaser.Sprite {
    constructor({game, x, y, angle, asset, duration = 1500, direction = -1}) {
        super(game, x, y, asset);

        // enable physics
        game.physics.enable(this);

        // physics values
        this.body.collideWorldBounds = false;
        this.body.setSize(22, 22, 20, 20);

        // display values
        this.anchor.setTo(0.5);
        this.scale.setTo(1.8, 1.8);

        // sprite animation
        this.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7], true);
        this.animations.play('move', 10, true);

        // movement
        this.body.moveTo(duration, 1000 * direction, angle);
    }

    update() {}
}
