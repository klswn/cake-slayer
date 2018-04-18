import Phaser from 'phaser';

export const LEFT = 'left';
export const RIGHT = 'right';

const JUMP_LEFT = 1;
const JUMP_RIGHT = 0;
const WALK_LEFT = 3;
const WALK_RIGHT = 2;

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
        this.body.setSize(60, 85, 10, 4);

        this.cursors = game.input.keyboard.createCursorKeys();
        this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.jumpTimer = 0;

        this.fireIcing = fireIcing;

        this.jumpSFX = this.game.add.audio('jumpSFX');

    }

    isJumping() {
        return this.game.time.now <= this.jumpTimer;
    }

    update() {
        if (this.isJumping()) {
            if (this.facing == LEFT) {
                this.frame = JUMP_LEFT;
            } else {
                this.frame = JUMP_RIGHT;
            }
        } else {
            if (this.facing == LEFT) {
                this.frame = WALK_LEFT;
            } else {
                this.frame = WALK_RIGHT;
            }
        }


        // this fires independent of the other keys
        if (this.spaceBar.isDown) {
            this.fireIcing();
        }

        if (this.cursors.up.isDown
                && this.body.onFloor()
                && !this.isJumping()) {
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
