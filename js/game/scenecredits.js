/**
 * SceneCredits
 * @summary Scene that shows who created the game
 * @public
 * @constructor {SceneCredits}
 * @param {AGameManager} gameManager
 */
function SceneCredits(gameManager)
{
	var assetManager = gameManager.getAssetManager();
	// Loads the credits background music
	assetManager.loadAudio("audio/bgm/Credits.ogg", "creditsBGM");
	// Loads the credits image
	assetManager.loadImage("img/Credits.png", "credits");
	
	// Step 0 is when the scene is fading in
	this.step = 0;
}

SceneCredits.prototype =
{
		/**
		 * Starts all scene elements
		 * @this {SceneTitle}
		 * @param {AGameManager} gameManager
		 */
		start: function(gameManager)
		{
			var assetManager = gameManager.getAssetManager();
			
			// Plays the background music
			gameManager.getAudioManager().playBGM(assetManager, "creditsBGM");
			
			// Creates a sprite for the credits image and positions it
			this.sprite = new ASprite(assetManager.getImage("credits"));
			this.sprite.position.x = 160;
			this.sprite.position.y = 160;
			
			// Creates a button to return to the title screen and set its text to be white
			this.button = new AUIButton(new ARect(256, 512, 128, 32), assetManager.getImage("button"), 7, "Go to title");
			this.button.getLabel().style = "white";
			this.button.hoveredTexture = assetManager.getImage("buttonHovered");
			this.button.clickedTexture = assetManager.getImage("buttonClicked");
			
			// Sets up the fade in animation
			this.anim = new ASimpleAnimation(1, 0, 1000, AEasing.easeInOutSine, function(animation, isFinished, value, lateTime) {
				// When it's complete
				if (isFinished)
				{
					// Goes to step 1
					// Step 1 is when the scene has faded in and now you can click the button 
					++animation.scene.step;
				}
			});
			this.anim.scene = this;
		},
		
		/**
		 * Handles the logical part of the scene
		 * @this {SceneTitle}
		 * @param {AGameManager} gameManager
		 */
		update: function(gameManager)
		{
			// If you're not on the part where you just have to click the button
			if (this.step != 1)
				// That means that the scene is fading
				this.anim.update(gameManager.getDeltaTime());
			
			// Updates the button state
			this.button.update(gameManager.getMouseManager());
			
			// If you are on the part where you have to click the button and you click it
			if ((this.step == 1) && (this.button.wasClicked()))
			{
				// Plays the confirm sound effect
				gameManager.getAudioManager().playSE(gameManager.getAssetManager(), "selection");
				// Goes to the fade out part
				++this.step;
				
				// Sets up the fade out animation
				this.anim.reset(0, 1, 1000, AEasing.easeInOutSine, function(animation, isFinished, value, lateTime) {
					if (isFinished)
						gameManager.getSceneManager().nextScene = new SceneTitle(gameManager);
				});	
			}
		},
		
		/**
		 * Draws the scene elements on the screen
		 * @this {SceneTitle}
		 * @param {AGameManager} gameManager
		 */
		draw: function(gameManager)
		{
			var graphicsManager   = gameManager.getGraphicsManager();
			var renderTexture     = graphicsManager.getRenderTexture();
			var context           = renderTexture.getContext();
			var previousFillStyle = context.fillStyle;
			
			// Paints the background black
			context.fillStyle = "black";
			context.fillRect(0, 0, renderTexture.getWidth(), renderTexture.getHeight());
			
			// Draws the credits image
			this.sprite.draw(graphicsManager);
			// Draws the button to go back to title
			this.button.draw(graphicsManager);
			
			// If the scene is fading in or out
			if ((this.step == 0) || (this.step == 2))
			{
				// Draws a black rectangle on the top of everything
				context.fillStyle = "rgba(0, 0, 0, " + this.anim.getValue().toString() + ')';
				context.fillRect(0, 0, renderTexture.getWidth(), renderTexture.getHeight());
			}
			
			context.fillStyle = previousFillStyle;
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