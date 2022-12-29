let game;

function setup() {
    let canvas = createCanvas(700, 700);
    canvas.parent("sketch");

    game = new Game();

        
    game.arrangePlatforms(game.world.originalPlatformSpread);    

    game.dom.initializeDom();
}

function draw() {
    background(93, 177, 193);

    if (game.won) {
        game.handleWin();
    }

    game.renderText();

    game.player.render();
    game.renderPlatforms();

    game.handleKeys();
    game.dom.handleDPADPresses();

    game.player.update();
}