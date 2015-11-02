/**
 * Manages the game flow
 * @constructor {AGameManager}
 * @param {number} width
 * @param {number} height
 */
function AGameManager(width, height, desiredFrameRate)
{
	console.log("Ankh v2014.12.14");
	console.log("Initializing game manager...");
	
	// Creates a manager for every possible need
	this._audioManager    = new AAudioManager();
	this._graphicsManager = new AGraphicsManager(width, height);
	this._mouseManager    = new AMouseManager(this._graphicsManager._renderTexture._element);
	
	this._assetManager    = new AAssetManager();
	this._sceneManager    = new ASceneManager();
	
	// Sets up some variables for frame rate shaping
	this._lastDate  = Date.now();
	this._deltaTime = 0;
	this._timeout   = 0;
	
	// And other variables for frame rate counting
	this._frameRate         = 0;
	this._frameCounter      = 0;
	this._frameCounterTimer = 0;
	
	this.setDesiredFrameRate(desiredFrameRate);
	
	console.log("Initializing game manager... DONE!");
}

AGameManager.prototype =
{
	/**
	 * Gets the audio  manager
	 * @this {AGameManager}
	 * @returns {AAudioManager}
	 */
	getAudioManager: function()
	{
		return this._audioManager;
	},
	
	/**
	 * Gets the graphics manager
	 * @this {AGameManager}
	 * @returns {AGraphicsManager}
	 */
	getGraphicsManager: function()
	{
		return this._graphicsManager;
	},
	
	/**
	 * Gets the mouse manager
	 * @this {AGameManager}
	 * @returns {AMouseManager}
	 */
	getMouseManager: function()
	{
		return this._mouseManager;
	},
	
	/**
	 * Gets the asset manager
	 * @this {AGameManager}
	 * @returns {AAssetManager}
	 */
	getAssetManager: function()
	{
		return this._assetManager;
	},
	
	/**
	 * Gets the scene manager
	 * @this {AGameManager}
	 * @returns {ASceneManager}
	 */
	getSceneManager: function()
	{
		return this._sceneManager;
	},
	
	/**
	 * Gets the elapsed time
	 * @this {AGameManager}
	 * @returns {Number}
	 */
	getDeltaTime: function()
	{
		return this._deltaTime;
	},
	
	/**
	 * Gets the appropriate timeout
	 * @this {AGameManager}
	 * @returns {Number}
	 */
	getTimeout: function()
	{
		return this._timeout;
	},
	
	/**
	 * Gets the current frame rate
	 * @this {AGameManager}
	 * @returns {Number}
	 */
	getFrameRate: function()
	{
		return this._frameRate;
	},
	
	/**
	 * Gets the desired frame rate
	 * @this {AGameManager}
	 * @returns {number|null}
	 */
	getDesiredFrameRate: function()
	{
		return this._desiredFrameRate;
	},
	
	/**
	 * Sets the desired frame rate
	 * @this {AGameManager}
	 * @param {number|null} value
	 */
	setDesiredFrameRate: function(value)
	{
		// If the given desired frame rate is null or 0 or below 0
		if ((value == null) || (value <= 0))
			// Then don't shape the frame rate
			this._desiredFrameRate = null;
		else
		{
			// Applies the desired frame rate
			this._desiredFrameRate = value;
			// Calculates the proper frame timeout
			this._frameRateTimeout = 1000 / value;
		}
		
	},
	
	/**
	 * Runs the game
	 * @this {AGameManager}
	 * @return {boolean}
	 */
	run: function()
	{
		// If the scene manager is holding any scene or there's a scene incoming
		if (this._sceneManager.isRunning())
		{
			// Calculates the elapsed time since last iteration
			var newDeltaTime = Date.now() - this._lastDate;
			// Saves the current time now because we might go
			this._lastDate  = Date.now();
			
			// If it's below 0
			if (newDeltaTime < 0)
				// Then just sets it to 0
				this._deltaTime = 0;
			// Otherwise
			else
				// It's good to goo
				this._deltaTime = newDeltaTime;
			
			// To calculate the current frame rate we have to reach a second
			// If the timer has not reached it yet
			if (this._frameCounterTimer < 1000)
			{
				// Adds the elapsed time
				this._frameCounterTimer += this._deltaTime;
				// Counts a frame
				++this._frameCounter;
			}
			// Otherwise, if it reached a second
			else
			{
				// Now that we reached a second, it's possible to tell how many frames have been drawn
				this._frameRate         = this._frameCounter;
				this._frameCounter      = 0;
				this._frameCounterTimer = this._deltaTime;
			}
			
			// Updates the fade effects
			this._audioManager.update(this._deltaTime);
			
			// If the asset manager is ready
			if (this._assetManager._isReady)
			{
				// Updates and draws the current scene
				this._sceneManager.update(this);
				this._sceneManager.draw(this);
			}
			// If it's not ready yet
			else
			{
				// Updates the asset mangger
				this._assetManager.update();
				console.log("Asset manager: loading new assets... " + ((this._assetManager._percentage * 100) | 0).toString() + '%');
			}
			
			// Updates the mouse manager
			this._mouseManager.update(this._deltaTime);
			
			// Lastly, if there's no desired frame rate
			if (this._desiredFrameRate == null)
				// Then there's no timeout
				this._timeout = 0;
			// But if there is...
			else
				// Then it's the 'proper frame timeout' minus the delay from the previous actions
				this._timeout = this._frameRateTimeout - (Date.now() - this._lastDate);
			
			return true;
		}
		
		return false;
	}
}