/* globals __DEV__ */
import Phaser from 'phaser';
import Boss from '../sprites/Boss';
import CakePop from '../sprites/CakePop.js';
import Player, {LEFT, RIGHT} from '../sprites/Player';

export default class extends Phaser.State {
    init() {}
    preload() {}

    create() {
        // set the background
        let background = this.add.image(this.world.centerX, this.world.centerY, 'background');
        background.anchor.setTo(0.5);

        // loop the theme music
        this.themeSong = new Phaser.Sound(this, 'cakeSlayerThemeLoop', 1, true);
        this.themeSong.play();

        // init SFX
        this.icingSFX = this.add.audio('icingSFX');
        this.cakeHitSFX = this.add.audio('cakeHitSFX');
        this.damageSFX = this.add.audio('damageSFX');

        // create the boss and player objects
        this.boss = new Boss({
            game: this.game,
            x: this.world.width - 180,
            y: this.world.height - 257,
            asset: 'boss',
        });

        this.player = new Player({
            game: this.game,
            x: 150,
            y: this.world.height,
            asset: 'player',
            fireIcing: () => this.fireIcing(),
        });

        this.icingGroup = this.game.add.group();
        this.icingGroup.enableBody = true;
        this.icingGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.icingGroup.createMultiple(50, 'icing');
        this.icingGroup.setAll('checkWorldBounds', true);
        this.icingGroup.setAll('outOfBoundsKill', true);
        this.nextFire = 0;
        this.fireRate = 250;

        this.game.add.existing(this.boss);
        this.game.add.existing(this.player);

        // create the cakePop loop
        this.game.time.events.loop(Phaser.Timer.SECOND * 1.5, this.fireCakePop, this);

        this.cakeHits = 0;

        this.playerHealth = 5;

        this.healthBar = [];

        this.lastBossHit = 0;

        for (let lcv=0; lcv < this.playerHealth; lcv++) {
            const x = 40 + (lcv * 40);
            const y = 50;
            const health = new Phaser.Sprite(this.game, x, y, 'health');
            health.scale.setTo(0.5, 0.5);
            this.healthBar[lcv] = health;
        }

        for (let lcv = 0; lcv < this.healthBar.length; lcv++) {
            this.game.add.existing(this.healthBar[lcv]);
        }
    }

    fireCakePop() {
        this.cakePop = new CakePop({
            game: this.game,
            x: this.boss.x - 64,
            y: this.boss.y - this.getRandomNumber(0, 64),
            angle: this.getRandomNumber(-25, 0),
            asset: 'cakePop',
        });

        this.game.add.existing(this.cakePop);
    }

    fireIcing() {
        if (this.game.time.now > this.nextFire && this.icingGroup.countDead() > 0) {
            const direction = this.player.facing === RIGHT ? 1 : -1;
            let icing = this.icingGroup.getFirstDead();

            this.nextFire = this.game.time.now + this.fireRate;

            icing.reset(this.player.x - 8, this.player.y - 8);

            this.game.physics.arcade.moveToXY(icing, 1000 * direction, this.player.y, 1000);
            this.icingSFX.play();
        }
    }

    cakePopCollisionHandler(player, cakePop) {
        cakePop.kill();
        this.hitPlayer();
        // add damage stuff here later
    }

    icingCollisionHandler(boss, icing) {
        icing.kill();
        this.cakeHitSFX.play();
        this.cakeHits++;

        if (this.cakeHits === 3) {
            this.boss.updateAnimation('oneThird');
        } else if (this.cakeHits === 6) {
            this.boss.updateAnimation('twoThirds');
        } else if (this.cakeHits === 9) {
            this.boss.updateAnimation('full');
        } else if (this.cakeHits === 12) {
            console.log('win!');
        }

        console.log(this.cakeHits);
        // add damage stuff for boss here
    }

    playerBossCollisionHandler(boss, player) {
        if (this.game.time.now - 1000 > this.lastBossHit) {
            this.lastBossHit = this.game.time.now;
            this.hitPlayer();
        }
    }

    hitPlayer() {
        this.damageSFX.play();
        this.playerHealth--;
        if (this.playerHealth === 0) {
            this.themeSong.stop();
            this.state.start('GameOver', false, true);
            return;
        }
        this.healthBar[this.playerHealth].kill();
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    update() {
        this.game.physics.arcade.overlap(this.player, this.cakePop, this.cakePopCollisionHandler, null, this);
        this.game.physics.arcade.overlap(this.boss, this.icingGroup, this.icingCollisionHandler, null, this);
        this.game.physics.arcade.overlap(this.boss, this.player, this.playerBossCollisionHandler, null, this);
    }

    render() {
        if (__DEV__) {
            // sprite position info
            //this.game.debug.spriteInfo(this.boss, 32, 32);
            //this.game.debug.spriteInfo(this.player, 32, 32);
            //this.game.debug.spriteInfo(this.cakePop, 32, 32);

            // sprite physics body info
            // this.game.debug.bodyInfo(this.player, 32, 32);
            this.game.debug.body(this.player);

            // this.game.debug.bodyInfo(this.boss, 32, 32);
            // this.game.debug.body(this.boss);

            // if (this.cakePop) this.game.debug.bodyInfo(this.cakePop, 32, 32);
            // if (this.cakePop) this.game.debug.body(this.cakePop);
        }
    }
}
