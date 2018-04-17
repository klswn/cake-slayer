import Phaser from 'phaser'
import {centerGameObjects} from '../utils'

export default class extends Phaser.State {
    init() {}

    preload() {
        this.loaderBg = this.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY,
            'loaderBg'
        );
        this.loaderBar = this.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY,
            'loaderBar'
        );
        centerGameObjects([this.loaderBg, this.loaderBar]);

        this.load.setPreloadSprite(this.loaderBar);

        // load images
        this.load.image('splash', 'assets/images/splash.png');
        this.load.image('background', 'assets/images/background.png');

        // load spritesheets
        this.load.spritesheet('boss', 'assets/images/cakeBoss.png', 256, 256);
        this.load.spritesheet('cakePop', 'assets/images/cakePop.png', 64, 64);
        this.load.spritesheet('player', 'assets/images/player.png', 64, 64);
        this.load.spritesheet('health', 'assets/images/health.png', 128, 128);
        this.load.spritesheet('icing', 'assets/images/icing.png', 36, 36);

        // load audio
        this.load.audio('cakeSlayerThemeLoop', 'assets/sounds/cakeSlayerThemeLoop.wav');
        this.load.audio('cakeSlayerTheme', 'assets/sounds/cakeSlayerTheme.wav');
        this.load.audio('icingSFX', 'assets/sounds/icingSound.wav');
        this.load.audio('cakeHitSFX', 'assets/sounds/cakeHitSound.wav');
        this.load.audio('jumpSFX', 'assets/sounds/jumpSound.wav');
        this.load.audio('damageSFX', 'assets/sounds/damageSound.wav');
        this.load.audio('airhornSFX', 'assets/sounds/airhorn.wav');
        this.load.audio('levelUpSFX', 'assets/sounds/levelUpSound.wav');
        this.load.audio('letsEatSFX', 'assets/sounds/letsEat.wav');
        this.load.audio('gameWinSFX', 'assets/sounds/gameWinSound.wav');
    }

    create() {
        // set the background
        let background = this.add.image(this.world.centerX, this.world.centerY, 'splash');
        background.anchor.setTo(0.5);

        // loop the music
        this.themeMusic = game.add.audio('cakeSlayerTheme');
        this.themeMusic.play();

        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    }

    startGame() {
        this.state.start('Game', false);
    }

    update() {
        if (this.enterKey.isDown) {
            if (!this.airhornFlag) {
                this.themeMusic.stop();
                //make sure airhorn only plays once
                this.add.audio('airhornSFX').play();
            }
            this.airhornFlag = true;
            game.camera.fade('#000', 1500);
            this.game.time.events.add(Phaser.Timer.SECOND * 1.5, this.startGame, this);
        }
    }
}
