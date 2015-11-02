/**
 * ALabel
 * @summary Moving object that holds a text
 * @public
 * @constructor {ALabel}
 * @param {string} text
 */
function ALabel(text)
{
	this.position  = AVector2.zero();
	this.text      = text;
	this.font      = "16px Arial";
	this.align     = "left";
	this.baseline  = "top";
	this.style     = "black";
}

ALabel.prototype =
{
		/**
		 * Draw
		 * @summary Draws the text on the screen
		 * @public
		 * @this {ALabel}
		 * @param {AGraphicsManager} graphicsManager
		 */
		draw: function(graphicsManager)
		{
			// Gets the context and saves all of its settings
			var context              = graphicsManager._renderTexture._context;
			var previousTextAlign    = context.textAlign;
			var previousTextBaseline = context.textBaseline;
			var previousFont         = context.font;
			var previousFillStyle    = context.fillStyle;
			
			// Applies the new ones
			context.textAlign    = this.align;
			context.textBaseline = this.baseline;
			context.font         = this.font;
			context.fillStyle    = this.style;
			
			// Draws the text on the screen
			context.fillText(this.text, this.position.x, this.position.y);
			
			// Restores the previous settings
			context.font         = previousFont;
			context.textAlign    = previousTextAlign;
			context.textBaseline = previousTextBaseline;
			context.fillStyle    = previousFillStyle;
		}
}