class Game {
    constructor() {
        this.world = {
            gravity: 1,
            platforms: [],
            playerStartPos: createVector(width/2 - 10, height - 25 - 50),
            goalColor: color(242, 235, 118),
            normalPlatformColor: color(96, 30, 8),
            startPlatformColor: color(52, 108, 65),
            originalPlatformSpread: 50,
            playerColor: color(34, 45, 246)
        };

        this.dom = {
			isMobileDevice: new MobileDetect(window.navigator.userAgent),
            leftButton: createButton("LEFT"),
            rightButton: createButton("RIGHT"),
            upButton: createButton("UP"),
            leftButtonPressed: false,
            rightButtonPressed: false,
            upButtonPressed: false,

            initializeDom: () => {
				if (this.dom.isMobileDevice.mobile() || this.dom.isMobileDevice.tablet()) {
                    this.dom.leftButton.position(width/2 - 100 - 75 - 50, 800)
                    this.dom.leftButton.size(150, 150);

                    this.dom.rightButton.position(width/2 + 25 + 50, 800)
                    this.dom.rightButton.size(150, 150);

                    this.dom.upButton.position(width/2 - 100 + 25, 650);
                    this.dom.upButton.size(150, 150);
				}
            },

            checkDPADPresses: () => {
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

            handleDPADPresses: () => {
				if (this.dom.isMobileDevice.mobile() || this.dom.isMobileDevice.tablet()) {
					
                    this.dom.checkDPADPresses();

                    if (this.dom.leftButtonPressed) {
                        this.player.vel.x = -this.player.moveSpeed;
                    }
                    else if (this.dom.rightButtonPressed) {
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
        if (keyIsDown(LEFT_ARROW)) {
            this.handleLeftKey();
        }
        else if (keyIsDown(RIGHT_ARROW)) {
            this.handleRightKey();
        }

        if (keyIsDown(UP_ARROW)) {
            this.handleUpKey();
        }
    }

    reset() {
        this.won = false;
        this.player = new Player(this.world.playerStartPos.x, this.world.playerStartPos.y);
        this.world.platforms = [];
        game.arrangePlatforms(this.world.originalPlatformSpread);
    }

    arrangePlatforms(spread) {
        // https://stackoverflow.com/a/26725665
        let platformX = spread;
        let platformY = height - 100;
        
        while(platformY > 50)
        {
            let platformWidth = random(150, 350);
            this.world.platforms.push(new Platform(platformX, platformY, platformWidth, random(10, 20), this.world.normalPlatformColor));

            if (platformX > (width / 2)) {
                platformX = random(50, (width / 2) - platformWidth - 20);
            } 
            else {
                platformX = (width/2) + random(25, (width / 2) - platformWidth - 50);
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