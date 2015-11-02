/**
 * SceneTitle
 * @summary Title scene
 * @constructor {SceneTitle}
 * @param {AGameManager}
 */
function SceneTitle(gameManager)
{
	var assetManager = gameManager.getAssetManager();
	
	// Loads the background music
	assetManager.loadAudio("audio/bgm/Title.ogg", "titleBGM");
	// Loads the confirm sound effect
	assetManager.loadAudio("audio/se/Select.ogg", "selection");
	
	// Loads the background image
	assetManager.loadImage("img/Title.png", "title");
	// Loads the button pattern image
	assetManager.loadImage("img/Button.png", "button");
	// Loads the mouse hovered button image
	assetManager.loadImage("img/ButtonHovered.png", "buttonHovered");
	// Loads the mouse clicked button image
	assetManager.loadImage("img/ButtonClicked.png", "buttonClicked");
	
	// Step stands for what point of the scene you are
	// Step 0 is when the scene is fading in
	this.step = 0;
}

SceneTitle.prototype =
{
	/**
	 * Starts all scene elements
	 * @this {SceneTitle}
	 * @param {AGameManager} gameManager
	 */
	start: function(gameManager)
	{
		var assetManager = gameManager.getAssetManager();
		
		// At start, all the assets that were requested to load are completely loaded here, so
		// then this plays the background music
		gameManager.getAudioManager().playBGM(assetManager, "titleBGM");
		
		// Creates a sprite for the background image
		this.background = new ASprite(assetManager.getImage("title"));
		
		// There are two buttons on the scene, so avoid searching for those images twice
		var buttonImage        = assetManager.getImage("button");
		var buttonHoveredImage = assetManager.getImage("buttonHovered");
		var buttonClickedImage = assetManager.getImage("buttonClicked");
		
		// Creates the two buttons
		this.startButton   = new AUIButton(new ARect(-128, 448, 128, 32), buttonImage, 7, "Start");
		this.creditsButton = new AUIButton(new ARect(-128, 512, 128, 32), buttonImage, 7, "Credits");
		
		// Set the buttons' textures
		this.startButton.hoveredTexture   = buttonHoveredImage;
		this.startButton.clickedTexture   = buttonClickedImage;
		this.creditsButton.hoveredTexture = buttonHoveredImage;
		this.creditsButton.clickedTexture = buttonClickedImage;
		
		// Changes the button text color to white
		this.startButton.getLabel().style   = "white";
		this.creditsButton.getLabel().style = "white";
		
		// Sets up the fade in animation, starts from 1 (totally opaque) and goes all the way to 0 (totally transparent)
		// The animation takes 1000 milliseconds and starts slow, goes through fast and arrives slow
		this.anim = new ASimpleAnimation(1, 0, 1000, AEasing.easeInOutSine, function(animation, isFinished, value, lateTime) {
			// When the animation is complete
			if (isFinished)
			{
				// Goes to the step 1
				// Step 2 is when the scene has faded in and the start button will start moving to its place
				animation.scene.step++;
				
				// Sets up the start button movement animation
				animation.reset(-128, 256, 250 - lateTime, AEasing.easeOutSine, function(animation, isFinished, value, lateTime) {
					// Updates the button position
					animation.scene.startButton.getPanel().destRect.x = value;
					
					// When the animation is complete
					if (isFinished)
					{
						// Goes to the step 2
						// Step 3 is when the second button start moving to its place
						animation.scene.step++;
						
						// Sets up the credits button movement animation
						animation.reset(-128, 256, 250 - lateTime, AEasing.easeOutSine, function(animation, isFinished, value, lateTime) {
							// Updates the button position
							animation.scene.creditsButton.getPanel().destRect.x = value;
						});
					}
				});				
			}
		})
		
		// As the callback function is an event, it doesn't know what are the elements we want to play with,
		// so we just place a reference so we can access it
		this.anim.scene = this;
	},
	
	/**
	 * Handles the logical part of the scene
	 * @this {SceneTitle}
	 * @param {AGameManager} gameManager
	 */
	update: function(gameManager)
	{
		var assetManager = gameManager.getAssetManager();
		var mouseManager = gameManager.getMouseManager();
		
		// Updates the animation
		this.anim.update(gameManager.getDeltaTime());
		
		// Updates the buttons' state
		this.startButton.update(mouseManager);
		this.creditsButton.update(mouseManager);
		
		// If the player has clicked start or credits
		var startWasClicked   = this.startButton.wasClicked();
		var creditsWasClicked = this.creditsButton.wasClicked();
		
		// The player can only press the button after the scene has faded in and the buttons are in their place
		if ((this.step == 2) && (startWasClicked || creditsWasClicked))
		{
			// So, if the player has clicked any of the buttons, plays the confirm sound effect
			gameManager.getAudioManager().playSE(assetManager, "selection");
			
			// Goes to the step 3
			// Step 3 is when you are leaving the current scene
			this.step = 3;
			
			// Sets up the animation that makes the start button go out of the screen
			this.anim.reset(this.startButton.getPanel().destRect.x, 640, 250, AEasing.easeInSine, function(animation, isFinished, value, lateTime) {
				// Updates the button position
				animation.scene.startButton.getPanel().destRect.x = value;
				
				// When the animation is complete
				if (isFinished)
				{
					// Goes to the step 4
					// Step 4 is when the second button is going out of the screen view
					animation.scene.step++;
					
					// Sets up the animation that makes the credits button go out of the screen
					animation.reset(animation.scene.creditsButton.getPanel().destRect.x, 640, 250, AEasing.easeInSine, function(animation, isFinished, value, lateTime) {
						// Updates the button position
						animation.scene.creditsButton.getPanel().destRect.x = value;
						
						// When the animation is complete
						if (isFinished)
						{
							// Goes to the step 5
							// Step 5 is when the scene is fading out
							animation.scene.step++;
							
							// Sets up the fade out animation
							animation.reset(0, 1, 1000, AEasing.easeInOutSine, function(animation, isFinished, value, lateTime) {
								// When the animation is complete
								if (isFinished)
								{
									// Check if it was the start button that was clicked
									if (startWasClicked)
										// If so, goes to the game scene
										gameManager.getSceneManager().nextScene = new SceneGame(gameManager);
									// Otherwise, goes to the credits scene
									else
										gameManager.getSceneManager().nextScene = new SceneCredits(gameManager);
								}
							});
						}
					});
				}
			});
		}
	},
	
	/**
	 * Handles the drawing part of the scene
	 * @this {SceneTitle}
	 * @param {AGameManager} gameManager
	 */
	draw: function(gameManager)
	{
		var graphicsManager = gameManager.getGraphicsManager();
		// Clears the screen
		graphicsManager.clear();
		
		// Draws the background
		this.background.draw(graphicsManager);
		// Draws the start button
		this.startButton.draw(graphicsManager);
		// Draws the credits button
		this.creditsButton.draw(graphicsManager);
		
		// If its fading in or fading out
		if ((this.step == 0) || (this.step == 5))
		{
			var renderTexture     = graphicsManager.getRenderTexture();
			var context           = graphicsManager.getContext();
			// Saves the context settings
			var previousFillStyle = context.fillStyle;
			
			// Draws a black rectangle on the screen
			context.fillStyle = "rgba(0, 0, 0, " + this.anim.getValue().toString() + ')';
			context.fillRect(0, 0, renderTexture.getWidth(), renderTexture.getHeight());
			
			// Restores the context settings
			context.fillStyle = previousFillStyle;
		}
	},
	
	/**
	 * Terminates all scene elements
	 * @this {SceneTitle}
	 * @param {AGameManager} gameManager
	 */
	terminate: function(gameManager)
	{
		
	}
}