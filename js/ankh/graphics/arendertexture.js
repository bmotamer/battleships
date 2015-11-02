/**
 * ARenderTexture
 * @summary Texture used for drawing
 * @public
 * @constructor {ARenderTexture}
 * @param {number} width
 * @param {number} height
 */
function ARenderTexture(width, height)
{
	// Tries to create a canvas
	this._element = document.createElement("canvas");
	
	// If it couldn't,
	if (this._element == null)
		// Then the browser probably doesn't support HTML5
		throw "Canvas is not supported!";
	
	// Tries to create a WebGL context
	// this._context = _element.getContext("webgl");
	// If it couldn't
	if (this._context == null)
	{
		// Then it tries to create an Experimental WebGL context
		// this._context = _element.getContext("experimental-webgl");
		// If it couldn't,
		if (this._context == null)
		{
			// Tries to create a 2D context
			this._context = this._element.getContext("2d");
			
			// If it couldn't,
			if (this._context == null)
				// Then the browser probably doesn't support HTML5
				throw "Canvas context is not supported!";
			// If it could create a 2D context
			else
				// Sets the context type to 2D
				this._contextType = AContextType.TWODEE;
		}
		// If it could create an Experimental WebGL context
		else
			// Sets the context type to Experimental WebGL
			this._contextType = AContextType.EXPERIMENTALWEBGL;
	}
	// If it could create a WebGL context
	else
		// Sets the context type to WebGL
		this._contextType = AContextType.WEBGL;
	
	// Resizes the canvas
	this._element.width  = width;
	this._element.height = height;
}

ARenderTexture.prototype =
{
	/**
	 * Width
	 * @summary Gets the width
	 * @public
	 * @this {ARenderTexture}
	 * @returns {number}
	 */
	getWidth: function()
	{
		return this._element.width;
	},
	
	/**
	 * Height
	 * @summary Gets the height
	 * @public
	 * @this {ARenderTexture}
	 * @returns {number}
	 */
	getHeight: function()
	{
		return this._element.height;
	},
	
	/**
	 * Context
	 * @summary Gets the context
	 * @public
	 * @this {ARenderTexture}
	 * @returns {WebGLRenderingContext|CanvasRenderingContext2D}
	 */
	getContext: function()
	{
		return this._context;
	},
	
	/**
	 * Context Type
	 * @summary Gets the context type
	 * @public
	 * @this {ARenderTexture}
	 * @returns {number}
	 */
	getContextType: function()
	{
		return this._contextType;
	}
}

/**
 * From Asset
 * @summary Transforms an asset into a render texture
 * @public
 * @static
 * @param {AAsset} asset
 * @returns {ARenderTexture}
 */
ARenderTexture.fromAsset = function(asset)
{
	// If the asset isn't an image
	if (!asset.isImage())
		// What's the point of continuing this?
		throw "Asset is not an image!";
	
	// Creates a render texture big enough to draw the image
	var img = asset._element;
	var renderTexture = new ARenderTexture(img.width, img.height);
	// Draws the image
	renderTexture._element.drawImage(0, 0, img);
	
	return renderTexture;
}

/**
 * From Image
 * @summary Transforms an image into a render texture
 * @public
 * @static
 * @param {HTMLImageElement} img
 * @returns {ARenderTexture}
 */
ARenderTexture.fromImage = function(img)
{
	// Creates a render texture big enough to draw the image
	var renderTexture = new ARenderTexture(img.width, img.height);
	// Draws the image
	renderTexture._element.drawImage(0, 0, img);
	
	return renderTexture;
}