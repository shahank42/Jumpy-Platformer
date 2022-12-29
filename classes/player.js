class Player {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);

        this.width = 20;
        this.height = 20;

        this.top = this.pos.y;
        this.left = this.pos.x;
        this.bottom = this.pos.y + this.height;
        this.right = this.pos.x + this.width;

        this.oldPos = createVector(x, y);

        this.oldTop = this.oldPos.y;
        this.oldLeft = this.oldPos.x;
        this.oldBottom = this.oldPos.y + this.height;
        this.oldRight = this.oldPos.x + this.width;

        this.isJumping = true;

        this.jumpSpeed = 15;
        this.moveSpeed = 3;
    }

    render() {
        stroke(0);
        strokeWeight(3);
        fill(game.world.playerColor);
        rect(this.pos.x, this.pos.y, this.width, this.height);
    }

    handlePlatformCollisions() {
        // https://gamedev.stackexchange.com/a/18402
        for (let i = 0; i < game.world.platforms.length; i++) {
            const platform = game.world.platforms[i];

            if (
                (this.left < platform.right) &&
                (this.right > platform.left) &&
                (this.top < platform.bottom) &&
                (this.bottom > platform.top)
            ) {
                if (this.oldBottom <= platform.top) {
                    this.isJumping = false;
                    this.vel.mult(0);
                    this.pos.y = platform.y - this.height;
                }

                if (this.oldTop >= platform.bottom) {
                    this.vel.mult(0);
                    this.pos.y = platform.bottom;
                }
            }

            if (
                (this.left < platform.right) &&
                (this.right > platform.left) &&
                (this.top < platform.bottom) &&
                (this.bottom > platform.top)
            ) {
                if (this.oldRight <= platform.left) {
                    this.pos.x = platform.left - this.width;
                }

                if (this.oldLeft >= platform.right) {
                    this.pos.x = platform.right;
                }
            }
        }
    }

    updateKinematicVariables() {
        this.oldPos.x = this.pos.x;
        this.oldPos.y = this.pos.y;

        this.vel.y += game.world.gravity;
        this.pos.add(this.vel);

        this.top = this.pos.y;
        this.left = this.pos.x;
        this.bottom = this.pos.y + this.height;
        this.right = this.pos.x + this.width;

        this.oldTop = this.oldPos.y;
        this.oldLeft = this.oldPos.x;
        this.oldBottom = this.oldPos.y + this.height;
        this.oldRight = this.oldPos.x + this.width;
    }

    handleBounds() {
        if (this.top > height) {
            this.pos.x = game.world.playerStartPos.x;
            this.pos.y = game.world.playerStartPos.y;
            game.totalScore -= 50;
            game.totalScore = max(0, game.totalScore);
        }
    }

    checkIfWon() {
        let goal = game.world.platforms[game.world.platforms.length - 1];
        if (
            (this.left < goal.right) &&
            (this.right > goal.left) &&
            (this.top < goal.bottom) &&
            (this.bottom > goal.top)
        ) {
            game.won = true;
        }
    }

    update() {
        this.updateKinematicVariables();

        this.handlePlatformCollisions();
        this.handleBounds();

        this.checkIfWon();
    }

    

    applyForce(force) {
        this.vel.add(force);
    }

}