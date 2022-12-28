let game;

function setup() {
    let canvas = createCanvas(700, 650);
    canvas.position(0, 0);

    game = new Game();
        
    game.arrangePlatforms(game.world.originalPlatformSpread);    

    game.dom.initializeDom();
}

function draw() {
    background(93, 177, 193);

    if (game.won) {
        game.reset();
    }

    game.player.render();
    game.renderPlatforms();

    game.handleKeys();
    game.dom.handleDPADPresses();

    game.player.update();
}