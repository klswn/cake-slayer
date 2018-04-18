import Phaser from 'phaser'

export default class extends Phaser.State {
    init() {}

    preload() {
        // load images
        this.load.image('gameOver', 'assets/images/gameOver.png');

        // load audio
        this.load.audio('gameOverSound', 'assets/sounds/gameOverSound.wav');
    }

    create() {
        // set the background
        let background = this.add.image(this.world.centerX, this.world.centerY, 'gameOver');
        background.anchor.setTo(0.5);

        // loop the music
        this.gameOverSound = game.add.audio('gameOverSound');
        this.gameOverSound.play();

        let enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.addOnce(this.resetGame, this);
    }

    resetGame() {
        this.gameOverSound.stop();
        this.state.start('Splash');
    }
}
