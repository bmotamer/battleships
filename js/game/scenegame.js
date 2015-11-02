/**
 * SceneGame
 * @summary It's where you play the game
 * @constructor {SceneGame}
 * @param {AGameManager} gameManager
 */
function SceneGame(gameManager)
{
	var assetManager = gameManager.getAssetManager();
	
	// Loads the background music
	assetManager.loadAudio("audio/bgm/Game.ogg", "game");
	// Loads the error sound
	assetManager.loadAudio("audio/se/Error.ogg", "error");
	// Loads the explosion sound
	assetManager.loadAudio("audio/se/Explosion.ogg", "explosion");
	// Loads the splash sound
	assetManager.loadAudio("audio/se/Water.ogg", "splash");
	
	// Loads the standard water autotile 
	assetManager.loadImage("img/Water.png", "water");
	// Loads the miss autotile
	assetManager.loadImage("img/WaterMiss.png", "miss");
	// Loads the ship autotile
	assetManager.loadImage("img/WaterHit.png", "hit");
	
	// Creates the map
	this.map = new AMap(10, 10);
	
	// Sets the mouse tile coordinates to 0
	this.mouseTileX = 0;
	this.mouseTileY = 0;
	
	// Creates the naval fleet
	this.fleet = [
	             new Ship("Aircraft Carrier", 5),
	             new Ship("Battleship",       4),
	             new Ship("Cruiser",          4),
	             new Ship("Destroyer",        3),
	             new Ship("Submarine",        2)
	];
	// Gets the amount of ships so we can determine when the game is over
	this.fleetLeft = this.fleet.length;
	// Sets the amount of shots done to 0
	this.shots = 0;
	
	// Creates an array to store all the texts that will pop up when you destroy a ship and another one for their animation
	this.labels          = [];
	this.labelAnimations = [];
	
	// Sets up the fade in animation
	this.fadeAnimation = new ASimpleAnimation(1, 0, 1000, AEasing.easeInOutSine);
}

SceneGame.prototype =
{
		/**
		 * Returns a list of points where a ship of the given length can fit on the map horizontally
		 * @private
		 * @this {SceneGame}
		 * @param {AMap} map
		 * @param {number} length
		 * @returns {Array}
		 */
		_findSpaceHorizontally: function(map, length)
		{
			// Creates the list
			var list = new Array();
			
			// Iterates through the entire map (this can actually be optimized but oh well)
			for (var y = 0; y < map.getHeight(); y++)
				for (var x = 0; x < map.getWidth(); x++)
				{
					// If the current position is taken already
					if (map.getPosition(x, y) != null)
						// Goes to the next one
						continue;
					
					// If the right of the ship is out of the map
					var right = x + length;
					if (right > map.getWidth())
						// Then goes to the next line
						break;
					
					// Starts with the proposition that the ship can fit
					var valid = true;
					
					// Then iterates through all the tiles that it will occupy (this can also be optimized)
					for (var dx = x; dx < right; dx++)
						// If any of them is taken
						if (map.getPosition(dx, y) != null)
						{
							// Then it can't fit there
							valid = false;
							break;
						}
					
					// If it fits there
					if (valid)
						// Adds position to the list of possibilities
						list.push(new AVector2(x, y));
				}
			
			return list;
		},
		
		/**
		 * Returns a list of points where a ship of the given length can fit on the map vertically
		 * @private
		 * @this {SceneGame}
		 * @param {AMap} map
		 * @param {number} length
		 * @returns {Array}
		 */
		_findSpaceVertically: function(map, length)
		{
			// Same happens here, but it goes vertically
			var list = new Array();
			
			for (var y = 0; y < map.getHeight(); y++)
				for (var x = 0; x < map.getWidth(); x++)
				{
					if (map.getPosition(x, y) != null)
						continue;
					
					var bottom = y + length;
					if (bottom > map.getHeight())
						break;
					
					var valid = true;
					
					for (var dy = y; dy < bottom; dy++)
						if (map.getPosition(x, dy) != null)
						{
							valid = false;
							break;
						}
					
					if (valid)
						list.push(new AVector2(x, y));
				}
			
			return list;
		},
		
		/**
		 * Fills the map with water tiles and ship tiles
		 * @private
		 * @this {SceneGame}
		 * @param {Array} fleet
		 * @param {AMap} map
		 * @param {AAsset} waterAsset
		 * @param {ARect} srcRect
		 */
		_fillMap: function(fleet, map, waterAsset, srcRect)
		{
			// Iterates through every ship
			for (var i = 0; i < fleet.length; i++)
			{
				var ship = fleet[i];
				
				// Randomizes if its orientation will be horizontal or vertical
				if (Math.random() < 0.5)
				{
					// If the random result is less than 0.5 then the orientation is horizontal
					// Then it tries to find all spaces that it could fit horizontally
					// (here it might happen that there's no space horizontally, so later we could fix this)
					var list     = this._findSpaceHorizontally(map, ship.getLength());
					// Anyways, gets a random position from the list
					var position = list[Math.floor(Math.random() * list.length)];
					
					for (var j = 0; j < ship.getLength(); j++)
					{
						// Creates a tile that contains the ship reference
						var tile             = new Tile(ship);
						// Adds a sprite to it, positions it where it should be on the grid and scale it
						tile.sprite          = new ASprite(waterAsset);
						tile.sprite.position = new AVector2((position.x + j) * 64, position.y * 64);
						tile.sprite.scale    = new AVector2(2, 2);
						// Also sets a source rectangle for it, this helps us do the autotile animation
						tile.sprite.srcRect  = srcRect;
						
						// And places the ship
						map.setPosition(position.x + j, position.y, tile);
					}
						
				}
				else
				{
					// Same applies here, but this one just does it vertically
					var list     = this._findSpaceVertically(map, ship.getLength());
					var position = list[Math.floor(Math.random() * list.length)];
					
					for (var j = 0; j < ship.getLength(); j++)
					{
						var tile             = new Tile(ship);
						tile.sprite          = new ASprite(waterAsset);
						tile.sprite.position = new AVector2(position.x * 64, (position.y + j) * 64);
						tile.sprite.scale    = new AVector2(2, 2);
						tile.sprite.srcRect  = srcRect;
						
						map.setPosition(position.x, position.y + j, tile);
					}
				}
			}
			
			// Iterates through the whole map
			for (var y = 0; y < map.getHeight(); y++)
				for (var x = 0; x < map.getWidth(); x++)
					// If there's no ship at this place
					if (map.getPosition(x, y) == null)
					{
						// Then just creates a water tile
						var tile             = new Tile();
						tile.sprite          = new ASprite(waterAsset);
						tile.sprite.position = new AVector2(x * 64, y * 64);
						tile.sprite.scale    = new AVector2(2, 2);
						tile.sprite.srcRect  = srcRect;
						
						map.setPosition(x, y, tile);
					}
		},
		
		/**
		 * Starts all scene elements
		 * @this {SceneGame}
		 * @param {AGameManager} gameManager
		 */
		start: function(gameManager)
		{
			var audioManager = gameManager.getAudioManager();
			var assetManager = gameManager.getAssetManager();
			
			// Plays the game background music
			audioManager.playBGM(assetManager, "game");
			
			// Gets the loaded water images
			this.waterMiss    = assetManager.getImage("miss");
			this.waterHit     = assetManager.getImage("hit");
			// Sets the initial source rectangle
			this.waterSrcRect = new ARect(0, 0, 32, 32);
			
			// Fills the map
			this._fillMap(this.fleet, this.map, assetManager.getImage("water"), this.waterSrcRect);
			
			// Sets up the water animation loop
			function waterAnimationLoop(animation, isFinished, value, lateTime)
			{
				// Basically it waits 750 milliseconds then it moves the source rectangle 32 pixels to the right
				// and repeats
				if (isFinished)
				{
					animation.scene.waterSrcRect.x = (animation.scene.waterSrcRect.x + 32) % 128;
					animation.reset(0, 0, 750, AEasing.linearTween, waterAnimationLoop);					
				}
			}
			
			this.waterAnimation       = new ASimpleAnimation(0, 0, 750, AEasing.linearTween, waterAnimationLoop);
			this.waterAnimation.scene = this;
		},
		
		/**
		 * Remove a popup label from the list
		 * @private
		 * @this {SceneGame}
		 * @param {ALabel} label
		 * @param {ASimpleAnimation} labelAnimation
		 */
		_removeLabel: function(label, labelAnimation)
		{
			var i;
			
			// Finds the label from the list
			for (i = 0; i < this.labels.length; i++)
				if (this.labels[i] == label)
				{
					// Then removes it
					this.labels.splice(i, 1);
					break;
				}
			
			// Finds the animation from the list
			for (i = 0; i < this.labelAnimations.length; i++)
				if (this.labelAnimations[i] == label)
				{
					// And also removes it
					this.labelAnimations.splice(i, 1);
					break;
				}
			
			// Because if we don't remove them, they'll be there eating performance for nothing
		},
		
		/**
		 * Adds a popup label to the screen
		 * @private
		 * @this {SceneGame}
		 * @param {number} screenX
		 * @param {number} screenY
		 * @param {string} text
		 */
		_addLabel : function(screenX, screenY, text)
		{
			// Creates the label with the given text
			var label      = new ALabel(text);
			// Aligns it to the center
			label.align    = "center";
			label.baseline = "middle";
			// Positions it where you asked for
			label.position = new AVector2(screenX, screenY);
			label.font     = "24px Arial Black";
			
			// Sets up its animation, it waits 1500 milliseconds and then...
			var labelAnimation = new ASimpleAnimation(0, 0, 1500, AEasing.linearTween, function(animation, isFinished, value, lateTime) {
				// ... when it's done...
				if (isFinished)
				{
					// ... setups the moving animation. It simply makes it go up.
					animation.reset(animation.screenY, -animation.screenY, 1000, AEasing.easeInSine, function(animation, isFinished, value, lateTime) {
						// Updates the label position
						animation.label.position.y = value;
						
						// When the animation is complete
						if (isFinished)
							// Removes it from the list
							animation.scene._removeLabel(animation.label, animation);
					});
				}
			})
			
			labelAnimation.scene   = this;
			labelAnimation.label   = label;
			labelAnimation.screenY = screenY;
			
			// Adds the label and its animation to the lists
			this.labels.push(label);
			this.labelAnimations.push(labelAnimation);
		},
		
		/**
		 * Updates the scene elements
		 * @this {SceneGame}
		 * @param {AGameManager} gameManager
		 */
		update: function(gameManager)
		{
			// Gets the elapsed time to update the animations
			var deltaTime = gameManager.getDeltaTime();
			
			// Updates the animations
			this.fadeAnimation.update(deltaTime);
			this.waterAnimation.update(deltaTime);
			
			for (var i = 0; i < this.labelAnimations.length; i++)
				this.labelAnimations[i].update(deltaTime);
			
			var audioManager    = gameManager.getAudioManager();
			var assetManager    = gameManager.getAssetManager();
			var graphicsManager = gameManager.getGraphicsManager();
			var sceneManager    = gameManager.getSceneManager();
			var mouseManager    = gameManager.getMouseManager();
			
			// Gets what tile the mouse is pointing at
			this.mouseTileX = Math.round(mouseManager.getPosition().x / 64 - 0.5);
			this.mouseTileY = Math.round(mouseManager.getPosition().y / 64 - 0.5);
			
			// If there's no fade animations running and the tile hovered is on the screen and clicked
			if (this.fadeAnimation.isFinished() && mouseManager.clicked() && (this.mouseTileX >= 0) && (this.mouseTileX < 10) && (this.mouseTileY >= 0) && (this.mouseTileY < 10))
			{
				// Gets the tile information
				var tile = this.map.getPosition(this.mouseTileX, this.mouseTileY);
				
				// If the tile was previously shot
				if (tile.wasShot())
					// Plays an error sound effect
					audioManager.playSE(assetManager, "error");
				// If it wasn't show before
				else
				{
					// Increases the amount of shots
					++this.shots;
					
					// Shoots at the tile, this function returns if there was a ship there or not
					var ship = tile.hit();
					
					// If there was not
					if (ship == null)
					{
						// Too bad, changes the tile sprite to 'miss'
						tile.sprite.setTexture(this.waterMiss);
						// And plays a splash sound effect
						audioManager.playSE(assetManager, "splash");
					}
					// If there was a ship at the position clicked
					else
					{
						// Plays an explosion sound effect
						audioManager.playSE(assetManager, "explosion");
						// Changes the texture to 'hit'
						tile.sprite.setTexture(this.waterHit);
						
						// If the ship is completely destroyed
						if (ship.isDestroyed())
						{
							// Adds a text informing what ship was destroyed
							this._addLabel(
									0.5 * graphicsManager.getWidth(),
									0.5 * graphicsManager.getHeight(),
									"You sank my " + ship.name + "!"
							);
							
							// Decreases the ships amount
							--this.fleetLeft;
							
							// If it's 0 or below 0
							if (this.fleetLeft <= 0)
							{
								// Fades out to the score scene
								this.fadeAnimation.reset(0, 1, 1000, AEasing.easeInOutSine, function(animation, isFinished, value, lateTime) {
									if (isFinished)
										sceneManager.nextScene = new SceneScore(gameManager, Math.round(((100 - animation.scene.shots) / 82) * 100) );
								});
								this.fadeAnimation.scene = this;
							}
						}
					}
				}
			}
			
		},
		
		/**
		 * Draws the scene elements to the screen
		 * @this {SceneGame}
		 * @param {AGameManager} gameManager
		 */
		draw: function(gameManager)
		{
			var graphicsManager = gameManager.getGraphicsManager();
			var renderTexture   = graphicsManager.getRenderTexture();
			var context         = renderTexture.getContext();
			
			// Draws every tile to the screen
			for (var y = 0; y < this.map.getHeight(); y++)
				for (var x = 0; x < this.map.getWidth(); x++)
					this.map.getPosition(x, y).sprite.draw(graphicsManager);
			
			// Draws the mouse cursor
			context.fillStyle = "rgba(255, 255, 255, 0.25)";
			context.fillRect(this.mouseTileX * 64, this.mouseTileY * 64, 64, 64);
			
			// Draws every label to the screen
			for (var i = 0; i < this.labels.length; i++)
			{
				var label            = this.labels[i];
				var previousPosition = label.position;
				
				// Notice that at this point it's drawing an outline
				label.style = "black";
				
				for (var y = -1; y <= 1; y++)
					for (var x = -1; x <= 1; x++)
					{
						label.position = new AVector2(previousPosition.x + x, previousPosition.y + y);
						label.draw(graphicsManager);
					}
						
				// Only at this point the text is being drawn with the correct color
				label.style    = "white";
				label.position = previousPosition;
				label.draw(graphicsManager);
			}
			
			// Draws the fade
			context.fillStyle = "rgba(0, 0, 0, " + this.fadeAnimation.getValue() + ')';
			context.fillRect(0, 0, renderTexture.getWidth(), renderTexture.getHeight());
		},
		
		/**
		 * Terminates all scene elements
		 * @this {SceneGame}
		 * @param {AGameManager} gameManager
		 */
		terminate: function(gameManager)
		{
		}
}