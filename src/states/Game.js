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
        let music = new Phaser.Sound(this, 'cakeSlayerThemeLoop', 1, true);
        music.play();

        // init SFX
        this.icingSFX = this.add.audio('icingSFX');
        this.cakeHitSFX = this.add.audio('cakeHitSFX');
        this.damageSFX = this.add.audio('damageSFX');

        // create the boss and player objects
        this.boss = new Boss({
            game: this.game,
            x: this.world.width - 180,
            y: this.world.height - 257,
            asset: 'bossNaked',
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
        this.icingGroup.createMultiple(50, 'cakePop');
        this.icingGroup.setAll('checkWorldBounds', true);
        this.icingGroup.setAll('outOfBoundsKill', true);
        this.nextFire = 0;
        this.fireRate = 250;

        this.game.add.existing(this.boss);
        this.game.add.existing(this.player);

        // create the cakePop loop
        this.game.time.events.loop(Phaser.Timer.SECOND * 1.5, this.fireCakePop, this);

        this.cakeHits = 0;
        this.playerHits = 0;
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
        this.damageSFX.play();
        this.playerHits++;
        // add damage stuff here later
    }

    icingCollisionHandler(boss, icing) {
        icing.kill();
        this.cakeHitSFX.play();
        this.cakeHits++;

        console.log(this.cakeHits);
        // add damage stuff for boss here
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    update() {
        this.game.physics.arcade.overlap(this.player, this.cakePop, this.cakePopCollisionHandler, null, this);
        this.game.physics.arcade.overlap(this.boss, this.icingGroup, this.icingCollisionHandler, null, this);
    }

    render() {
        if (__DEV__) {
            // sprite position info
            //this.game.debug.spriteInfo(this.boss, 32, 32);
            //this.game.debug.spriteInfo(this.player, 32, 32);
            //this.game.debug.spriteInfo(this.cakePop, 32, 32);

            // sprite physics body info
            // this.game.debug.bodyInfo(this.player, 32, 32);
            // this.game.debug.body(this.player);

            // this.game.debug.bodyInfo(this.boss, 32, 32);
            // this.game.debug.body(this.boss);

            // if (this.cakePop) this.game.debug.bodyInfo(this.cakePop, 32, 32);
            // if (this.cakePop) this.game.debug.body(this.cakePop);
        }
    }
}
