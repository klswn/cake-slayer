import Phaser from 'phaser';

const LEFT = 'left';
const RIGHT = 'right';

const PLAYER_LEFT_FRAME = 0;
const PLAYER_RIGHT_FRAME = 1;

export default class extends Phaser.Sprite {
    constructor({game, x, y, asset}) {
        super(game, x, y, asset);
        game.physics.enable(this);
        this.body.collideWorldBounds = true;
        this.anchor.setTo(0.5);
        this.direction = -1;
        this.facing = LEFT;
        this.cursors = game.input.keyboard.createCursorKeys();

        this.body.velocity.x = 0;
        this.body.setSize(180, 250, 40, 4);
        this.scale.setTo(0.5, 0.5);

        this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.leftCursor = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightCursor = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    }

    update() {
        if (this.facing == LEFT) {
            this.frame = PLAYER_LEFT_FRAME;
        } else {
            this.frame = PLAYER_RIGHT_FRAME;
        }

        // if (jumpButton.isDown && this.body.onFloor() && game.time.now > jumpTimer)
        // {
        //     player.body.velocity.y = -250;
        //     jumpTimer = game.time.now + 750;
        // }

        if (!this.leftCursor.isDown && !this.rightCursor.isDown) {
            this.body.velocity.x =0;
        } else if (this.leftCursor.isDown) {
            this.facing = LEFT;
            this.body.velocity.x = -150;

            // if (this.facing != LEFT)
            // {
            //     this.animations.play(LEFT);
            //     this.facing = LEFT;
            // }
        } else if (this.rightCursor.isDown) {
            this.facing = RIGHT;
            this.body.velocity.x = 150;

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
