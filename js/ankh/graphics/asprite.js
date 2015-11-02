/**
 * ASprite
 * @summary Moving object that holds a texture
 * @public
 * @constructor {ASprite}
 * @param {AAsset|ARenderTexture} obj
 */
function ASprite(texture)
{
	this.position        = AVector2.zero();
	this.scale           = AVector2.one();
	
	this.srcRect         = null;
	this.destRect        = null;
	
	this.visible         = true;
	
	this._texture        = null;
	this._textureElement = null;
	
	this.setTexture(texture);
}

ASprite.prototype =
{
		/**
		 * Texture
		 * @summary Gets the texture of this sprite
		 * @public
		 * @this {ASprite}
		 * @returns {AAsset|ARenderTexture}
		 */
		getTexture: function()
		{
			return this._texture;
		},
		
		/**
		 * Texture
		 * @summary Sets the texture of this sprite
		 * @param {AAsset|ARenderTexture} obj
		 * @this {ASprite}
		 */
		setTexture: function(obj)
		{
			// If the given texture is null
			if (obj == null)
			{
				// Sets the current texture to null
				this._texture        = null;
				this._textureElement = null;
			}
			// If the given texture is an asset
			else if (obj instanceof AAsset)
			{
				// Ensures that it's an image
				if (!obj.isImage())
					throw "Asset is not an image!";
				
				// Sets the current texture to the asset
				this._texture        = obj;
				this._textureElement = obj._element;
			}
			// If the given texture is a render texture
			else if (obj instanceof ARenderTexture)
			{
				// Sets the current texture to the given render texture
				this._texture        = obj;
				this._textureElement = obj._element;
			}
		},
		
		/**
		 * Draw
		 * @summary Draws the sprite on the screen
		 * @public
		 * @param {AGraphicsManager} graphicsManager
		 * @this {ASprite}
		 */
		draw: function(graphicsManager)
		{
			// If it's invisible, or there's no texture
			if ((!this.visible) || (this._textureElement == null))
				// Don't do anything
				return;
			
			// Checks what the current context tpye
			switch (graphicsManager.getContextType())
			{
				// If it's 2D
				case AContextType.TWODEE:
					// If there's no source rectangle
					if (this.srcRect == null)
					{
						// If there's no destination rectangle
						if (this.destRect == null)
						{
							// If the scale is normal
							if ((this.scale.x == 1) && (this.scale.y == 1))
								// Uses the simplest  function to draw the image on the screen
								graphicsManager._renderTexture._context.drawImage(
									this._textureElement,
									this.position.x,
									this.position.y
								);
							// If the scale isn't normal
							else
								// Draws the the image scaled
								graphicsManager._renderTexture._context.drawImage(
									this._textureElement,
									this.position.x,
									this.position.y,
									this._textureElement.width  * this.scale.x,
									this._textureElement.height * this.scale.y
								);
						}
						// If there's a destination rectangle
						else
						{
							// Draws the image scaled to fit that rectangle
							graphicsManager._renderTexture._context.drawImage(
								this._textureElement,
								this.destRect.x,
								this.destRect.y,
								this.destRect.width,
								this.destRect.height
							);
						}
					}
					// If there's a source rectangle
					else
					{
						// If there's no destination rectangle
						if (this.destRect == null)
						{
							// Draws the image cut and scaled
							graphicsManager._renderTexture._context.drawImage(
								this._textureElement,
								this.srcRect.x,
								this.srcRect.y,
								this.srcRect.width,
								this.srcRect.height,
								this.position.x,
								this.position.y,
								this.srcRect.width  * this.scale.x,
								this.srcRect.height * this.scale.y
							);
						}
						// If there's a destination rectangle
						else
						{
							// Drwas the image cut and scaled to fit the destination rectangle
							graphicsManager._renderTexture._context.drawImage(
								this._textureElement,
								this.srcRect.x,
								this.srcRect.y,
								this.srcRect.width,
								this.srcRect.height,
								this.destRect.x,
								this.destRect.y,
								this.destRect.width,
								this.destRect.height
							);
						}
					}
					
					break;
				// If the context isn't 2D
				default:
					// Throws that other modes are not supported yet
					throw "GL is not supported yet!";
			}
		}
}