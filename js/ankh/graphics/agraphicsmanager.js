/**
 * AGraphicsManager
 * @summary Manages the graphics of the game
 * @public
 * @constructor {AGraphicsManager}
 * @param {number} width
 * @param {number} height
 */
function AGraphicsManager(width, height)
{
	console.log("Initializing graphics manager...");
	
	// Creates a render texture for drawing
	this._renderTexture = new ARenderTexture(width, height);
	// The render texture is not attached to any of the page objects yet
	this._parent = null;
	
	console.log("Initializing graphics manager... DONE!");
}

AGraphicsManager.prototype =
{
	/**
	 * Render Texture
	 * @summary Gets the render texture
	 * @public
	 * @this {AGraphicsManager}
	 * @returns {ARenderTexture}
	 */
	getRenderTexture: function()
	{
		return this._renderTexture;
	},
	
	/**
	 * Context
	 * @summary Gets the render texture context
	 * @public
	 * @this {AGraphicsManager}
	 * @returns {WebGLRenderingContext|CanvasRenderingContext2D}
	 */
	getContext: function()
	{
		return this._renderTexture._context;
	},
	
	/**
	 * Context Type
	 * @summary Gets the render texture context type
	 * @public
	 * @this {AGraphicsManager}
	 * @returns {number}
	 */
	getContextType: function()
	{
		return this._renderTexture._contextType;
	},
	
	/**
	 * Setup
	 * @summary Attaches the render texture to an page element
	 * @public
	 * @this {AGraphicsManager}
	 * @param {HTMLElement} element
	 */
	setup: function(element)
	{
		// If it had another parent before
		if (this._parent != null)
		{
			// Then detach from it
			this._parent.removeChild(this._renderTexture._element);
			console.log("Graphics manager: detached from '" + (this._parent.name || this._parent.id).toString() + "'");
		}
		
		// Updates the current parent
		this._parent = element;
		
		if (this._parent != null)
		{
			// And attaches teh render texture to it
			this._parent.appendChild(this._renderTexture._element);
			console.log("Graphics manager: attached to '" + (this._parent.name || this._parent.id).toString() + "'");
		}
		
	},
	
	/**
	 * Clear
	 * @summary Clears the entire render texture
	 * @public
	 * @this {AGraphicsManager}
	 */
	clear: function()
	{
		this._renderTexture._context.clearRect(
			0,
			0,
			this._renderTexture._element.width,
			this._renderTexture._element.height
		);
	},
	
	/**
	 * Width
	 * @summary Gets the width of the render texture
	 * @public
	 * @this {AGraphicsManager}
	 * @returns {number}
	 */
	getWidth: function()
	{
		return this._renderTexture._element.width;
	},
	
	/**
	 * Height
	 * @summary Gets the height of the render texture
	 * @public
	 * @this {AGraphicsManager}
	 * @returns {number}
	 */
	getHeight: function()
	{
		return this._renderTexture._element.height;
	}
}