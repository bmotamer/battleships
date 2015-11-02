/**
 * AAssetManager
 * @summary Manages all the assets
 * @public
 * @constructor {AAssetManager}
 */
function AAssetManager()
{
	console.log("Initializing asset manager...");
	
	this._assets     = {};
	this._isReady      = true;
	this._percentage = 1;
	
	console.log("Initializing asset manager... DONE!");
}

AAssetManager.prototype =
{
		/**
		 * Load Asset
		 * @summary Loads an asset
		 * @public
		 * @param {string} tag
		 * @param {string} src
		 * @param {string|null} nickname
		 * @this {AAssetManager}
		 */
		loadAsset: function(tag , src, nickname)
		{
			// If no nickname was given
			if (nickname == null)
				// Just use the url
				nickname = src;
			
			// Checks if there's a list of the given tag already
			var assets = this._assets[tag];
			
			// If there's not
			if (assets == null)
			{
				// Creates it
				assets = {};
				this._assets[tag] = assets;
			}
			
			// Then loads the new asset
			assets[nickname] = new AAsset(tag, src);
			// Sets that theree's stuff to load
			this._isReady = false;
		},
		
		/**
		 * Asset
		 * @summary Gets a copy of an asset
		 * @public
		 * @param {string} tag
		 * @param {string} nickname
		 * @this {AAssetManager}
		 * @returns {AAsset}
		 */
		getAsset: function(tag, nickname)
		{
			var assets = this._assets[tag];
			
			if (assets == null)
				return null;
			
			var asset = assets[nickname];
			
			if (asset == null)
				return null;
			
			return asset;
		},
		
		/**
		 * Unload Asset
		 * @summary Unloads an asset
		 * @public
		 * @param {string} tag
		 * @param {string} nickname
		 * @this {AAssetManager}
		 */
		unloadAsset: function(tag, nickname)
		{
			var assets = this._assets[tag];
			
			if (assets != null)
				assets[nickname] = null;
		},
		
		/**
		 * Load Audio
		 * @summary Loads an audio asset
		 * @public
		 * @param {string} src
		 * @param {string|null} nickname
		 * @this {AAssetManager}
		 */
		loadAudio: function(src, nickname)
		{
			this.loadAsset("audio", src, nickname);
		},
		
		/**
		 * Audio
		 * @summary Gets a copy of the audio asset
		 * @public
		 * @param {string} nickname
		 * @this {AAssetManager}
		 * @returns {AAsset|null}
		 */
		getAudio: function(nickname)
		{
			return this.getAsset("audio", nickname);
		},
		
		/**
		 * Unload Audio
		 * @summary Unloads an audio file
		 * @public
		 * @param {string} nickname
		 * @this {AAssetManager}
		 */
		unloadAudio: function(nickname)
		{
			this.unloadAsset("audio", nickname);
		},
		
		/**
		 * Load Image
		 * @summary Loads an image file
		 * @public
		 * @param {string} src
		 * @param {string|null} nickname
		 * @this {AAssetManager}
		 */
		loadImage: function(src, nickname)
		{
			this.loadAsset("img", src, nickname);
		},
		
		/**
		 * Image
		 * @summary Gets a copy of the image asset
		 * @public
		 * @param {string} nickname
		 * @this {AAssetManager}
		 * @returns {AAsset|null}
		 */
		getImage: function(nickname)
		{
			return this.getAsset("img", nickname);
		},
		
		/**
		 * Unload Image
		 * @summary Unloads an audio file
		 * @public
		 * @param {string} nickname
		 * @this {AAssetManager}
		 */
		unloadImage: function(nickname)
		{
			this.unloadAsset("img", nickname);
		},
		
		/**
		 * Load Video
		 * @summary Loads an image file
		 * @public
		 * @param {string} src
		 * @param {string|null} nickname 
		 * @this {AAssetManager}
		 */
		loadVideo: function(src, nickname)
		{
			this.loadAsset("video", src, nickname);
		},
		
		/**
		 * Video
		 * @summary Gets a copy of the video asset
		 * @public
		 * @param {string} nickname
		 * @this {AAssetManager}
		 * @returns {AAsset|null}
		 */
		getVideo: function(nickname)
		{
			return this.getAsset("video", nickname);
		},
		
		/**
		 * Unload Video
		 * @summary Unloads a video file
		 * @public
		 * @this {AAssetManager}
		 * @param {string} nickname
		 */
		unloadVideo: function(nickname)
		{
			this.unloadAsset("video", nickname);
		},
		
		/**
		 * Update
		 * @summary Updates the ready state
		 * @public
		 * @this {AAssetManager}
		 */
		update: function()
		{
			// If its ready
			if (this._isReady)
				// Does nothing
				return;
			
			var tagName;
			var assetList;
			var assetName;
			var asset;
			
			var complete = true;
			var length = 0;
			
			this._percentage = 0;
			
			// Iterates through all the assets
			for (tagName in this._assets)
			{
				assetList = this._assets[tagName];
				
				for (assetName in assetList)
				{
					asset = assetList[assetName];
					
					// If there's any that's not complete
					if (asset._state != AAssetState.COMPLETE)
						// Then it's not ready
						complete = false;
					
					// Sums the percentages of all assetss
					this._percentage += asset.getPercentage();
					++length;
				}
			}
			
			if (complete)
				this._isReady = true;
			
			// Gets the average percentage
			this._percentage /= length;
		},
		
		/**
		 * Is Ready
		 * @summary Returns if all assets are loaded
		 * @public
		 * @this {AAssetManager}
		 * @returns {boolean}
		 */
		isReady: function()
		{
			return this._isReady;
		},
		
		/**
		 * Percentage
		 * @summary Gets the total asset loading progress
		 * @public
		 * @this {AAssetManager}
		 * @returns {number}
		 */
		getPercentage: function()
		{
			return this._percentage;
		},
		
		/**
		 * Unload All
		 * @summary Clears the asset list
		 * @public
		 * @this {AAssetManager}
		 */
		unloadAll: function()
		{
			this._assets = {};
		}
}