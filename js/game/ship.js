/**
 * Ship
 * @param {string} name
 * @param {number} length
 * @param {number} orientation
 */
function Ship(name, length)
{
	this.name    = name;
	this._length = length;
}

Ship.prototype =
{
		/**
		 * Gets the current size of the ship
		 * @returns {number}
		 */
		getLength: function()
		{
			return this._length;
		},
		
		/**
		 * Hits the ship
		 * @this {Ship}
		 */
		hit: function()
		{
			if (this._length <= 0)
				return;
			
			--this._length;
		},
		
		/**
		 * Is the ship destroyed
		 * @this {Ship}
		 * @returns {boolean}
		 */
		isDestroyed: function()
		{
			return this._length <= 0;
		}
}