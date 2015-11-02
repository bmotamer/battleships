/**
 * Panel
 * @summary Builds a panel by a given texture and border
 * @public
 * @constructor {AUIPanel}
 * @param {ARect} destRect
 * @param {AAsset|ARenderTexture} texture
 * @param {number} border
 */
function AUIPanel(destRect, texture, border)
{
	this.destRect = destRect;
	this.texture  = texture;
	this.border   = border;
}

AUIPanel.prototype =
{
		/**
		 * Draws the panel onto the screen
		 * @public
		 * @param {AGraphicsManager} graphicsManager
		 * @this {AUIPanel}
		 */
		draw: function(graphicsManager)
		{
			// Gets the context what we're supposed to draw on
			var context        = graphicsManager._renderTexture._context;
			var textureElement = this.texture._element;
			
			// Calculates the border times two because the 'border' means a corner, and if the panel size is
			// smaller than two corners, adjustments have to be done
			var borderTimesTwo = this.border * 2;
			var hasHorizontalMiddle;
			var hasVerticalMiddle;
			var cornerWidth;
			var cornerHeight;
			
			// If the panel width is too small
			if (Math.abs(this.destRect.width) <= borderTimesTwo)
			{
				// That means there's no vertical middle
				hasVerticalMiddle = false;
				// Calculates the new scaled corner
				cornerWidth       = this.destRect.width * 0.5;
			}
			// If the panel isn't that small
			else
			{
				// There's a vertical middle
				hasVerticalMiddle = true;
				// And the corner is at its normal size
				cornerWidth       = this.border;
			}
			
			// If the panel height is too small
			if (Math.abs(this.destRect.height) <= borderTimesTwo)
			{
				// That means there's no horizontal middle
				hasHorizontalMiddle = false;
				// Calculates the new scaled corner
				cornerHeight        = this.destRect.height * 0.5;
			}
			// If the panel isn't that small
			else
			{
				// There's a horizontal middle
				hasHorizontalMiddle = true;
				// And the corner is at its normal size
				cornerHeight        = this.border;
			}
			
			// Draws the first segment of the panel
			// X O O
			// O O O
			// O O O
			context.drawImage(
					textureElement,  // Texture
					
					0,               // Source X
					0,               // Source Y
					this.border,     // Source Width
					this.border,     // Source Height
					
					this.destRect.x, // Destination X
					this.destRect.y, // Destination Y
					cornerWidth,     // Destination Width
					cornerHeight     // Destination Height
			);
			
			if (hasVerticalMiddle)
			{
				// Draws the middle upper and lower segments of the panel
				// O X O
				// O O O
				// O X O
				context.drawImage(
						textureElement,
						
						this.border,
						0,
						textureElement.width - borderTimesTwo,
						this.border,
						
						this.destRect.x + cornerWidth,
						this.destRect.y,
						this.destRect.width - borderTimesTwo,
						cornerHeight
				);
				
				context.drawImage(
						textureElement,
						
						this.border,
						textureElement.height - this.border,
						textureElement.width - borderTimesTwo,
						this.border,
						
						this.destRect.x + cornerWidth,
						this.destRect.y + this.destRect.height - cornerHeight,
						this.destRect.width - borderTimesTwo,
						cornerHeight
				);
			}
			
			// Draws the right upper corner of the panel
			// O O X
			// O O O
			// O O O
			context.drawImage(
					textureElement,
					
					textureElement.width - this.border,
					0,
					this.border,
					this.border,
					
					this.destRect.x + this.destRect.width - cornerWidth,
					this.destRect.y,
					cornerWidth,
					cornerHeight
			);
			
			if (hasHorizontalMiddle)
			{
				// Draws the left and right segments of the panel's middle
				// O O O
				// X O X
				// O O O
				context.drawImage(
						textureElement,
						
						0,
						this.border,
						this.border,
						textureElement.height - borderTimesTwo,
						
						this.destRect.x,
						this.destRect.y + cornerHeight,
						cornerWidth,
						this.destRect.height - borderTimesTwo
				);
				
				context.drawImage(
						textureElement,
						
						textureElement.width - this.border,
						this.border,
						this.border,
						textureElement.height - borderTimesTwo,
						
						this.destRect.x + this.destRect.width - cornerWidth,
						this.destRect.y + cornerHeight,
						cornerWidth,
						this.destRect.height - borderTimesTwo
				);
			}
			
			if (hasHorizontalMiddle && hasVerticalMiddle)
			{
				// Draws the very center of the panel
				// O O O
				// O X O
				// O O O
				context.drawImage(
						textureElement,
						
						this.border,
						this.border,
						textureElement.width - borderTimesTwo,
						textureElement.height - borderTimesTwo,
						
						this.destRect.x + cornerWidth,
						this.destRect.y + cornerHeight,
						this.destRect.width - borderTimesTwo,
						this.destRect.height - borderTimesTwo
				);
			}
			
			// Draws the left lower corner of the panel
			// O O O
			// O O O
			// X O O
			context.drawImage(
					textureElement,
					
					0,
					textureElement.height - this.border,
					this.border,
					this.border,
					
					this.destRect.x,
					this.destRect.y + this.destRect.height - cornerHeight,
					cornerWidth,
					cornerHeight
			);
			
			// Draws the right lower corner of the panel
			// O O O
			// O O O
			// O O X
			context.drawImage(
					textureElement,
					
					textureElement.width - this.border,
					textureElement.height - this.border,
					this.border,
					this.border,
					
					this.destRect.x + this.destRect.width - cornerWidth,
					this.destRect.y + this.destRect.height - cornerHeight,
					cornerWidth,
					cornerHeight
			);
		}
}