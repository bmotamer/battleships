/**
 * SceneScore
 * @summary Presents the player their score
 * @public
 * @constructor {SceneScore}
 * @param {AGameManager} gameManager
 * @param {number} totalScore
 */
function SceneScore(gameManager, totalScore)
{
	var assetManager = gameManager.getAssetManager();
	// Loads the background music
	assetManager.loadAudio("audio/bgm/Score.ogg", "scoreBGM");
	
	var renderTexture = gameManager.getGraphicsManager().getRenderTexture();
	
	// Creates the text that will be in the middle of the screen that shows how good you did
	this.label            = new ALabel("0%");
	this.label.font       = "42px Arial Black";
	this.label.style      = "white";
	this.label.align      = "center";
	this.label.baseline   = "middle";
	this.label.position.x = 0.5 * renderTexture.getWidth();
	this.label.position.y = 0.5 * renderTexture.getHeight();
	
	// Sets up the fading in animation
	this.anim = new ASimpleAnimation(1, 0, 1000, AEasing.easeInOutSine, function(animation, isFinished, value, lateTime) {
		// When the animation is complete
		if (isFinished)
		{
			// Goes to step 1
			// Step 1 is when the number is the score is going from 0% to the totalScore
			++animation.scene.step;
			
			// Sets up the score animation
			animation.reset(0, totalScore, 3000, AEasing.easeOutCirc, function(animation, isFinished, value, lateTime) {
				// Updates the text to the current animation value
				animation.scene.label.text = Math.round(value).toString() + '%';
				
				// When the animation is complete
				if (isFinished)
					// Goes to the part where you just have to click the button
					++animation.scene.step;
			});			
		}
	});
	this.anim.scene = this;
	
	// Step 0 is when the scene is fading in
	this.step = 0;
}

SceneScore.prototype =
{
		
		/**
		 * Start
		 * @summary Initialize the scene components
		 * @public
		 * @param {AGameManager} gameManager
		 */
		start: function(gameManager)
		{
			var assetManager = gameManager.getAssetManager();
			var audioManager = gameManager.getAudioManager();
			
			// Plays the background music
			audioManager.playBGM(assetManager, "scoreBGM");
			
			// Creates the button to go back to the title screen and sets the text color to be white
			this.button = new AUIButton(new ARect(256, 512, 128, 32), assetManager.getImage("button"), 7, "Go to title");
			this.button.getLabel().style = "white";
			this.button.hoveredTexture = assetManager.getImage("buttonHovered");
			this.button.clickedTexture = assetManager.getImage("buttonClicked");
		},
		
		/**
		 * Update
		 * @summary Updates the scene components
		 * @public
		 * @param {AGameManager} gameManager
		 */
		update: function(gameManager)
		{
			var mouseManager = gameManager.getMouseManager();
			
			// Updates the animation
			this.anim.update(gameManager.getDeltaTime());
			
			// Updates the button state
			this.button.update(mouseManager);
			
			// If it's at the part where you just have to click the button
			if ((this.button.wasClicked()) && (this.step == 2))
			{
				// Plays the confirm sound effect
				gameManager.getAudioManager().playSE(gameManager.getAssetManager(), "selection");
				
				// Goes to the fade out part
				++this.step;
				
				// Sets up the fade out animation
				this.anim.reset(0, 1, 1000, AEasing.easeInOutSine, function(animation, isFinished, value, lateTime) {
					// When it's complete goes back to the title scene
					if (isFinished)
						gameManager.getSceneManager().nextScene = new SceneTitle(gameManager);
				});
			}
		},
		
		/**
		 * Draw
		 * @summary Draws the scene components
		 * @public
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
			
			// Draws the score text
			this.label.draw(graphicsManager);
			
			// Draws the button to go back to the title scene
			this.button.draw(graphicsManager);
			
			// If it's fading in or fading out
			if ((this.step == 0) || (this.step == 3))
			{
				// Draws a black rectangle on the top of everything
				context.fillStyle = "rgba(0, 0, 0, " + this.anim.getValue().toString() + ')';
				context.fillRect(0, 0, renderTexture.getWidth(), renderTexture.getHeight());
			}
			
			context.fillStyle = previousFillStyle;
		},
		
		terminate: function(gameManager)
		{
			
		},
		
}