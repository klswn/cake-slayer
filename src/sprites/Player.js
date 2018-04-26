import Phaser from 'phaser';

const PLAYER_SPEED = 300;
const PLAYER_GRAVITY = 2000;
export const ICING_SPEED = 1000;
export const PLAYER_HEALTH = 5;
const JUMP_VELOCITY = 1000;

export const LEFT = 'left';
export const RIGHT = 'right';

const JUMP_LEFT = 1;
const JUMP_RIGHT = 0;
const WALK_LEFT = 3;
const WALK_RIGHT = 2;

export default class extends Phaser.Sprite {
    constructor({game, x, y, asset, fireIcing}) {
        super(game, x, y, asset);
        game.physics.enable(this);

        this.game = game;
        this.body.collideWorldBounds = true;
        this.anchor.setTo(0.5);
        this.facing = RIGHT;

        this.body.gravity.y = PLAYER_GRAVITY;

        this.body.velocity.x = 0;
        this.body.setSize(64, 85, 14, 8);

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
            this.body.velocity.y = -1 * JUMP_VELOCITY;
            this.jumpTimer = game.time.now + 750;
        }

        if (!this.cursors.left.isDown && !this.cursors.right.isDown) {
            this.body.velocity.x = 0;
        } else if (this.cursors.left.isDown) {
            this.facing = LEFT;
            this.body.velocity.x = -1 * PLAYER_SPEED;
        } else if (this.cursors.right.isDown) {
            this.facing = RIGHT;
            this.body.velocity.x = PLAYER_SPEED;
        }
    }
}
