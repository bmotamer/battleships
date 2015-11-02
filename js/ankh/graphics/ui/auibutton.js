/**
 * AUIButton
 * @summary User interface button
 * @public
 * @constructor {AUIButton}
 * @param {ARect} destRect
 * @param {AAsset|ARenderTexture} texture
 * @param {number} border
 */
function AUIButton(destRect, texture, border, text)
{
	// By default the button uses the same texture for every state
	this.disabledTexture = texture;
	this.enabledTexture  = texture;
	this.hoveredTexture  = texture;
	this.clickedTexture  = texture;
	// The button text is normally centered, but you can change this if you want to offset it
	this.labelOffset     = AVector2.zero();
	
	// A button is usually composed of an image and a text
	this._panel      = new AUIPanel(destRect, texture, border);
	this._label      = new ALabel(text);
	this._wasClicked = false;
}

AUIButton.prototype =
{
		/**
		 * Panel
		 * @summary Gets the panel
		 * @public
		 * @this {AUIButton}
		 * @return {AUIPanel}
		 */
		getPanel: function()
		{
			return this._panel;
		},
		
		/**
		 * Label
		 * @summary Gets the label
		 * @public
		 * @this {AUIButton}
		 * @return {ALabel}
		 */
		getLabel: function()
		{
			return this._label;
		},
		
		/**
		 * Was Clicked
		 * @summary Gets if the button was clicked
		 * @public
		 * @this {AUIButton}
		 * @returns {boolean}
		 */
		wasClicked: function()
		{
			return this._wasClicked;
		},
		
		/**
		 * Update
		 * @summary Updates the button state
		 * @public
		 * @param {AMouseManager} mouseManager
		 * @this {AUIButton}
		 */
		update: function(mouseManager)
		{
			// Resets the flag that it was clicked to false
			this._wasClicked = false;
			
			// If the mouse is hovering the panel
			if (this._panel.destRect.contains(
					mouseManager._position.x,
					mouseManager._position.y
			))
			{
				// And it clicked
				if (mouseManager._clicked)
				{
					// Sets the current texture to an appropriate one
					this._panel.texture = this.clickedTexture;
					// Sets the clicked flag to true
					this._wasClicked    = true;
				}
				// Normally on operating systems, the 'clicked texture' is shown while you're pressing it,
				// not only when you clicked, so we have to make sure it looks similar
				else if ((mouseManager._buttons[0]._state & AInputButtonState.DOWN) != 0)
					this._panel.texture = this.clickedTexture;
				// If it wasn't clicked or pressed at all
				else
					// Just use the 'hovered texture'
					this._panel.texture = this.hoveredTexture;
			}
			// If the mouse isn't hovering it
			else
				// Use the standard texture
				this._panel.texture = this.enabledTexture;
		},
		
		/**
		 * Draw
		 * @summary Draws the button onto the screen 
		 * @public
		 * @param {AGraphicsManager} graphicsManager
		 * @this {AUIButton}
		 */
		draw: function(graphicsManager)
		{
			// Draws the 'base' of the button on the screen
			this._panel.draw(graphicsManager);
			
			// Aligns the text to the center
			this._label.align      = "center";
			this._label.baseline   = "middle";
			
			// Correctly positions it
			this._label.position.x = this._panel.destRect.x + this._panel.destRect.width * 0.5 + this.labelOffset.x;
			this._label.position.y = this._panel.destRect.y + this._panel.destRect.height * 0.5 + this.labelOffset.y;
			
			// Draws the text on the screen
			this._label.draw(graphicsManager);
		}
}