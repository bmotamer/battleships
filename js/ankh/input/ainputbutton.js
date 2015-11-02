/**
 * AInputButton
 * @summary Generic input button
 * @public
 * @constructor {AInputButton}
 */
function AInputButton()
{
	
	this._state = AInputButtonState.NONE; 
	
	this.isDown = false;
	
	this.isRepeatingEnabled = true;
	this._isRepeating       = false;
	this._repeatTimer       = 0;
	
	
	this.repeatDelay    = 1000;
	this.repeatInterval = 500;
}

AInputButton.prototype =
{
		/**
		 * Update
		 * @summary Updates the button state
		 * @public
		 * @param {number} deltaTime
		 * @this {AInputButton}
		 */
		update: function(deltaTime)
		{
			// Delta time can't be negative
			if (deltaTime < 0)
				deltaTime = 0;
			
			// If the button is begin pressed
			if (this.isDown)
			{
				// Checks for the current button state
				switch (this._state)
				{
					// If it was just pressed
					case AInputButtonState.TRIGGERED:
						// Changes it to pressed
						this._state = AInputButtonState.PRESSED;
						break;
					// If it's pressed
					case AInputButtonState.PRESSED:
						// Do nothing
						break;
					// If it's repeated
					case AInputButtonState.REPEATED:
						// Changes it to pressed
						this._state = AInputButtonState.PRESSED;
						break;
					// If it's anything else
					default:
						// Changes it to just pressed
						this._state = AInputButtonState.TRIGGERED;
						break;
				}
				
				// If repeating is enabled
				if (this.isRepeatingEnabled)
				{
					// If the timer is 0 or below
					if (this._repeatTimer <= 0)
						// If it started repeating, set the timer to the interval value, otherwise to the delay
						this._repeatTimer = this._isRepeating ? this.repeatInterval : this.repeatDelay;
					
					// Updates the timer
					this._repeatTimer -= deltaTime;
					
					// If the timer is 0 or below
					if (this._repeatTimer <= 0)
					{
						// Sets the state to repeated
						this._state       = AInputButtonState.REPEATED;
						// Sets that it started repeating
						this._isRepeating = true;
					}
				}
				// If repeating isn't enabled
				else
				{
					// Resets the timer and set that it started repeating to false
					this._repeatTimer = 0;
					this._isRepeating = false;
				}
			}
			// If the button isn't being pressed
			else
			{
				// Checks for the current state
				switch (this._state)
				{
					// If it's not pressed
					case AInputButtonState.NONE:
						// Do nothing
						break;
					// If it was just released
					case AInputButtonState.RELEASED:
						// Changes it to unpressed
						this._state = AInputButtonState.NONE;
						break;
					// If it's anything else
					default:
						// Changes it to just released
						this._state = AInputButtonState.RELEASED;
						break;
				}
				
				// Resets the timer and set that it started repeating to false
				this._repeatTimer = 0;
				this._isRepeating = false;
			}
		}
}