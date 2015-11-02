/**
 * ASimpleAnimation
 * @summary Class that turns a value into another by a given time
 * @public
 * @constructor {ASimpleAnimation}
 * @param {number} startValue
 * @param {number} endValue
 * @param {number} duration
 * @param {*} easing
 * @param {*} callback
 */
function ASimpleAnimation(startValue, endValue, duration, easing, callback)
{
	this.reset(startValue, endValue, duration, easing, callback);
}

ASimpleAnimation.prototype =
{
		/**
		 * Reset
		 * @summary Resets the elapsed time and changes all the animation settings
		 * @public
		 * @param {number} startValue
		 * @param {number} endValue
		 * @param {number} duration
		 * @param {*} easing
		 * @param {*} callback
		 * @this {ASimpleAnimation}
		 */
		reset: function(startValue, endValue, duration, easing, callback)
		{
			this._startValue  = startValue;
			this._endValue    = endValue;
			this._elapsedTime = 0;
			this._duration    = duration;
			
			if (easing == null)
				this._easing = AEasing.linearTween;
			else
				this._easing = easing;
			
			this._callback = callback;
		},
		
		/**
		 * Value
		 * @summary Gets the current value of the animation
		 * @public
		 * @this {ASimpleAnimation}
		 * @returns {number}
		 */
		getValue: function()
		{
			// All easing functions take the same parameters
			return this._easing(
					this._elapsedTime,
					this._startValue,
					this._endValue - this._startValue,
					this._duration
			);
		},
		
		/**
		 * Is Finished
		 * @summary Gets if the animation is complete
		 * @public
		 * @this {ASimpleAnimation}
		 * @returns {boolean}
		 */
		isFinished: function()
		{
			return this._elapsedTime == this._duration;
		},
		
		/**
		 * Update
		 * @summary Updates the current value
		 * @public
		 * @param {number} deltaTime
		 * @this {ASimpleAnimation}
		 */
		update: function(deltaTime)
		{
			// If the animation is over, there's nothing left to do
			if (this._elapsedTime == this._duration)
				return;
			
			// Delta time can't be negative, otherwise animation would go backwards
			if (deltaTime < 0)
				deltaTime = 0;
			
			// Calculates the new elapsed time because the callback for when it's complete is different
			// from the standard one
			var newElapsedTime = this._elapsedTime + deltaTime;
			
			// When it's not complete
			if (newElapsedTime < this._duration)
			{
				// Updates the elapsed time
				this._elapsedTime = newElapsedTime;
				
				// Does the call back
				if (this._callback != null)
					this._callback(
							this,                                  // Reference to self
							false,                                 // The animation isn't complete 
							this._easing(                          // Current value
								this._elapsedTime,
								this._startValue,
								this._endValue - this._startValue,
								this._duration
							),
							0                                      // Late time
					);
			}
			// When it's complete
			else
			{
				// Updates the elapsed time
				this._elapsedTime = this._duration;
				
				// Does the callback
				if (this._callback != null)
					this._callback(
							this,                           // Reference to self
							true,                           // The animation is complete
							this._endValue,                 // Current value
							newElapsedTime - this._duration // It might happen that the animation is running late
					);
			}
		}
		
}