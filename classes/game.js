class Game {
    constructor() {
        this.world = {
            gravity: 1,
            platforms: [],
            playerStartPos: createVector(width/2 - 10, height - 25 - 50),
            goalColor: color(242, 235, 118),
            normalPlatformColor: color(96, 50, 20),
            startPlatformColor: color(52, 108, 65),
            originalPlatformSpread: 55,
            playerColor: color(187, 34, 9),
            initialScore: 100,
        };

        this.totalScore = this.world.initialScore;

        this.dom = {
			isMobileDevice: new MobileDetect(window.navigator.userAgent),
            leftButton: createButton("←"),
            rightButton: createButton("→"),
            upButton: createButton("↑"),
            //resetButton: createButton("RESET LEVEL"),

            leftButtonPressed: false,
            rightButtonPressed: false,
            upButtonPressed: false,
            resetButtonPressed: false,

            initializeDom: () => {
				if (this.dom.isMobileDevice.mobile() || this.dom.isMobileDevice.tablet()) {
                    this.dom.leftButton.position(width/2 - 275, height + 250)
                    this.dom.leftButton.size(150, 150);
                    this.dom.leftButton.addClass("dpad-key");

                    this.dom.rightButton.position(width/2 + 125, height + 250)
                    this.dom.rightButton.size(150, 150);
                    this.dom.rightButton.addClass("dpad-key");

                    this.dom.upButton.position(width/2 - 75, height + 150);
                    this.dom.upButton.size(150, 150);
                    this.dom.upButton.addClass("dpad-key");
				}

                //this.dom.resetButton.position(0, height + 100);
                //this.dom.resetButton.size(200, 100);
            },

            checkButtonPresses: () => {
                this.dom.leftButton.touchStarted(() => {
                    this.dom.leftButtonPressed = true;
                });
            
                this.dom.leftButton.touchEnded(() => {
                    this.dom.leftButtonPressed = false;
                })
            
                this.dom.rightButton.touchStarted(() => {
                    this.dom.rightButtonPressed = true;
                });
            
                this.dom.rightButton.touchEnded(() => {
                    this.dom.rightButtonPressed = false;
                })
            
                this.dom.upButton.touchStarted(() => {
                    this.dom.upButtonPressed = true;
                });
            
                this.dom.upButton.touchEnded(() => {
                    this.dom.upButtonPressed = false;
                })
            },

            handleButtonPresses: () => {

                //this.dom.resetButton.mouseClicked(() => {
                  //  game.reset();
                //});
        

				if (this.dom.isMobileDevice.mobile() || this.dom.isMobileDevice.tablet()) {
					
                    this.dom.checkButtonPresses();

                    if (this.dom.leftButtonPressed) {
                        this.player.vel.x = -this.player.moveSpeed;
                    }
                    
                    if (this.dom.rightButtonPressed) {
                        this.player.vel.x = this.player.moveSpeed;
                    }
                
                    if (this.dom.upButtonPressed) {
                        if (!this.player.isJumping) {
                            this.player.vel.y = -this.player.jumpSpeed;
                            this.player.isJumping = true;
                        }
                    }
				
				}
            },
        }

        this.player = new Player(this.world.playerStartPos.x, this.world.playerStartPos.y);;

        this.won = false;
    }

    renderText() {
        let scoreText = "Score: " + this.totalScore;
        textSize(16);
        //fill(0);
        text(scoreText, 5, 15);
    }

    handleLeftKey() {
        this.player.vel.x = -this.player.moveSpeed;
    }

    handleRightKey() {
        this.player.vel.x = this.player.moveSpeed;
    }

    handleUpKey() {
        if (!this.player.isJumping) {
            this.player.vel.y = -this.player.jumpSpeed;
            this.player.isJumping = true;
        }
    }

    handleKeys() { 
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
            this.handleLeftKey();
        }
        
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
            this.handleRightKey();
        }

        if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
            this.handleUpKey();
        }
    }

    handleWin() {
        let oldTotalScore = this.totalScore;
        this.reset();
        this.totalScore += oldTotalScore + 100;
    }

    reset() {
        this.won = false;
        this.player = new Player(this.world.playerStartPos.x, this.world.playerStartPos.y);
        this.world.platforms = [];
        game.arrangePlatforms(this.world.originalPlatformSpread);
        this.totalScore = 0;
    }

    arrangePlatforms(spread) {
        // https://stackoverflow.com/a/26725665
        let platformX = spread;
        let platformY = height - 100;
        
        while(platformY > 50)
        {
            let platformWidth = random(150, 300);
            this.world.platforms.push(new Platform(platformX, platformY, platformWidth, random(10, 20), this.world.normalPlatformColor));

            if (platformX > (width / 2)) {
                platformX = random(width/6, (width / 2) - platformWidth - 20);
            } 
            else {
                platformX = (width/2) + random(25, (width / 2) - platformWidth - width/6);
            }

            platformY -= (spread - 10) + random(0, 10);
        }

        let lastPlatform = this.world.platforms[this.world.platforms.length - 1];
        this.world.platforms.push(new Platform(width/2 - 100, height - 25, 200, 25, this.world.startPlatformColor));
        this.world.platforms.push(new Platform(lastPlatform.x + lastPlatform.width/2 - 12.5, lastPlatform.y -25, 25, 25, this.world.goalColor));
    }

    renderPlatforms() {
        for (let i = 0; i < this.world.platforms.length; i++) {
            this.world.platforms[i].render();
        }
    }
}