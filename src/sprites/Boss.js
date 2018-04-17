import Phaser from 'phaser';

export default class extends Phaser.Sprite {
    constructor({game, x, y, asset}) {
        super(game, x, y, asset);
        game.physics.enable(this);
        this.animations.add('move', [0, 1, 2, 3, 4, 5], true);
        this.body.collideWorldBounds = true;
        this.anchor.setTo(0.5);
        this.scale.setTo(3, 3);
        this.direction = -1;
        this.animations.play('move', 10, true);
    }

    update() {
        if (!this.body.isMoving) {
            this.body.moveTo(1000, 80 * this.direction, 0);
            this.direction = -this.direction;
        }
    }
}
