/**
 * AAsset
 * @summary Manages the asset loading
 * @public
 * @constructor {AAsset}
 * @param {string} tag
 * @param {string} src
 */
function AAsset(tag, src)
{
	// Creates an element of the given tag types
	this._element = document.createElement(tag);
	
	// If the element couldn't be created
	if (this._element == null)
		// Throws that it couldn't
		throw "'" + tag + "' is not supported!";
	
	this._state     = AAssetState.NONE;
	this._percentage = 0;
	
	// Sets event handlers for every possible asset loading event
	this._element.asset            = this;
	this._element.onload           = AAsset._onComplete;
	this._element.onloadstart      = AAsset._onLoading;
	this._element.ondurationchange = AAsset._onLoading;
	this._element.onloadedmetadata = AAsset._onLoading;
	this._element.onloadeddata     = AAsset._onLoading;
	this._element.onprogress       = AAsset._onLoading;
	this._element.oncanplay        = AAsset._onLoading;
	this._element.oncanplaythrough = AAsset._onLoading;
	this._element.onerror          = AAsset._onError;
	this._element.onabort          = AAsset._onError;
	this._element.preload          = "auto";
	this._element.src              = src;
	
	// Loads the asset
	if (this._element.load != null)
		this._element.load();
}

AAsset.prototype =
{
		/**
		 * State
		 * @summary Gets this asset state
		 * @public
		 * @this {AAsset}
		 * @returns {number}
		 */
		getState: function()
		{
			return this._state;
		},
		
		/**
		 * Percentage
		 * @summary Gets this asset's loading percentage
		 * @public
		 * @this {AAsset}
		 * @returns {number}
		 */
		getPercentage: function()
		{
			return this._percentage;
		},
		
		/**
		 * Clone
		 * @summary Clones this asset
		 * @public
		 * @this {AAsset}
		 * @returns {AAsset}
		 */
		clone: function()
		{
			return new AAsset(
				this._element.tagName,
				this._element.src
			);
		},
		
		/**
		 * Is Audio
		 * @summary Returns if the asset is an audio
		 * @public
		 * @this {AAsset}
		 * @returns {Boolean}
		 */
		isAudio: function()
		{
			return this._element.tagName == "AUDIO";
		},
		
		/**
		 * Is Image
		 * @summary Returns if the asset is an image
		 * @public
		 * @this {AAsset}
		 * @returns {Boolean}
		 */
		isImage: function()
		{
			return this._element.tagName == "IMG";
		},
		
		/**
		 * Is Video
		 * @summary Returns if the asset is a video
		 * @public
		 * @this {AAsset}
		 * @returns {Boolean}
		 */
		isVideo: function()
		{
			return this._element.tagName == "VIDEO";
		}
}

/**
 * On complete
 * @summary Happens when the asset is fully loaded
 * @public
 * @static
 * @event
 */
AAsset._onComplete = function(event)
{
	var element = event.target;
	var asset   = element.asset;
	
	// Sets the asset state to complete
	asset._state     = AAssetState.COMPLETE;
	asset._percentage = 1;
	
	// Now that it's fully loaded we can unmute it and reset the elapsed time to 0
	element.currentTime = 0;
	element.muted       = false;
	element.volume      = 1;	
}

/**
 * On Loading
 * @summary Happens when the asset is being loaded
 * @public
 * @static
 * @event
 */
AAsset._onLoading = function(event)
{
	var element = event.target;
	var asset   = element.asset;
	
	try
	{
		// Tries to calculate the percentage loaded 
		asset._percentage = element.buffered.end(0) / element.duration;
		// This is done because for some reason browsers tend not to buffer the entire audio or
		// video if the same is not somehow 'active'. We also set the volume to 0 because Firefox plays a little
		// bit of the sound and we don't want that
		element.muted  = true;
		element.volume = 0;
		element.play();
		element.pause();
		
	}
	catch (exception)
	{
		// If it couldn't, sets the percentage to 0
		asset._percentage = 0;
	}
	
	// If the percentage is below 100%
	if (asset._percentage < 1)
		// Sets the asset state to 'still loading'
		asset._state = AAssetState.LOADING;
	// If it's complete
	else
		// Calls the on complete event
		AAsset._onComplete(event);
}

/**
 * On Error
 * @summary Happens when something went wrong
 * @public
 * @static
 * @event
 */
AAsset._onError = function(event)
{
	var asset = event.target.asset;
	
	// Sets the asset state to error and the percentage to 0
	asset._state     = AAssetState.ERROR;
	asset._percentage = 0;
}

/**
 * Audio
 * @summary Creates an audio asset
 * @public
 * @static
 * @param {string} src
 * @returns {AAsset}
 */
AAsset.audio = function(src)
{
	return new AAsset("audio", src);
}

/**
 * Image
 * @summary Creates an image asset
 * @public
 * @static
 * @param {string} src
 * @returns {AAsset}
 */
AAsset.image = function(src)
{
	return new AAsset("img", src);
}

/**
 * Video
 * @summary Creates a video asset
 * @public
 * @static
 * @param {string} src
 * @returns {AAsset}
 */
AAsset.video = function(src)
{
	return new AAsset("video", src);
}