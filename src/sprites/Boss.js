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

        // sprite animations
        this.animations.add('naked', [0, 1, 2, 3, 4, 5, 6], true);
        this.animations.add('oneThird', [7, 8, 9, 10, 11, 12, 13], true);
        this.animations.add('twoThirds', [14, 15, 16, 17, 18, 19, 20], true);
        this.animations.add('full', [21, 22, 23, 24, 25, 26, 27], true);

        this.updateAnimation('naked');
    }

    updateAnimation(animationName) {
        this.animations.play(animationName, 10, true);
    }

    update() {}
}
