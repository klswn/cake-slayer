import Phaser from 'phaser';

export const LEFT = 'left';
export const RIGHT = 'right';

const PLAYER_LEFT_FRAME = 1;
const PLAYER_RIGHT_FRAME = 0;

const LATERAL_VELOCITY = 300;

export default class extends Phaser.Sprite {
    constructor({game, x, y, asset, fireIcing}) {
        super(game, x, y, asset);
        game.physics.enable(this);

        this.game = game;
        this.body.collideWorldBounds = true;
        this.anchor.setTo(0.5);
        this.facing = RIGHT;

        this.body.gravity.y = 2000;

        this.body.velocity.x = 0;
        this.body.setSize(40, 59, 10, 4);
        this.scale.setTo(1.75, 1.75);

        this.cursors = game.input.keyboard.createCursorKeys();
        this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.jumpTimer = 0;

        this.fireIcing = fireIcing;

        this.jumpSFX = this.game.add.audio('jumpSFX');

    }

    update() {
        if (this.facing == LEFT) {
            this.frame = PLAYER_LEFT_FRAME;
        } else {
            this.frame = PLAYER_RIGHT_FRAME;
        }

        // this fires independent of the other keys
        if (this.spaceBar.isDown) {
            this.fireIcing();
        }

        if (this.cursors.up.isDown
                && this.body.onFloor()
                && this.game.time.now > this.jumpTimer) {
            this.jumpSFX.play();
            this.body.velocity.y = -1000;
            this.jumpTimer = game.time.now + 750;
        }

        if (!this.cursors.left.isDown && !this.cursors.right.isDown) {
            this.body.velocity.x = 0;
        } else if (this.cursors.left.isDown) {
            this.facing = LEFT;
            this.body.velocity.x = -1 * LATERAL_VELOCITY;

            // if (this.facing != LEFT)
            // {
            //     this.animations.play(LEFT);
            //     this.facing = LEFT;
            // }
        } else if (this.cursors.right.isDown) {
            this.facing = RIGHT;
            this.body.velocity.x = LATERAL_VELOCITY;

            // if (this.facing != RIGHT)
            // {
            //     this.animations.play(RIGHT);
            //     this.facing = RIGHT;
            // }
        }
        // else
        // {
        //     if (this.facing != 'idle')
        //     {
        //         // this.animations.stop();
        //
        //         if (this.facing == LEFT)
        //         {
        //             this.frame = 0;
        //         }
        //         else
        //         {
        //             this.frame = 1;
        //         }
        //
        //         this.facing = 'idle';
        //     }
        // }
    }
}
