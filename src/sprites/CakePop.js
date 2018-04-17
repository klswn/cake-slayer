import Phaser from 'phaser';

export default class extends Phaser.Sprite {
    constructor({game}) {
        super(game);
        game.physics.enable(this);
        this.frame = 3;
        this.body.collideWorldBounds = false;
        this.anchor.setTo(0.5);
        this.direction = -1;
    }

    update() {
        if (!this.body.isMoving) {
            this.body.moveTo(1500, 1000 * this.direction, 0);
        }
    }
}
