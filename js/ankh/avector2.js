/**
 * Defines a 2D vector
 * @constructor {AVector2}
 * @param {number} x
 * @param {number} y
 */
function AVector2(x, y)
{
	this.x = x;
	this.y = y;
}

AVector2.prototype =
{
		/**
		 * Sets both coordinates of this vector
		 * @this {AVector2}
		 * @param {number} x
		 * @param {number} y
		 */
		set: function(x, y)
		{
			this.x = x;
			this.y = y;
		},
		
		/**
		 * Adds a value to this vector
		 * @this {AVector2}
		 * @param {number|AVector2} obj
		 * @param {number|null} y
		 */
		add: function(obj, y)
		{
			if (obj instanceof AVector2)
			{
				this.x += obj.x;
				this.y += obj.y;
			}
			else if (y == null)
			{
				this.x += obj;
				this.y += obj;
			}
			else
			{
				this.x += obj;
				this.y += y;
			}
		},
		
		/**
		 * Subtracts a value from this vector
		 * @this {AVector2}
		 * @param {number|AVector2} obj
		 * @param {number|null} y
		 */
		subtract: function(obj, y)
		{
			if (obj instanceof AVector2)
			{
				this.x -= obj.x;
				this.y -= obj.y;
			}
			else if (y == null)
			{
				this.x -= obj;
				this.y -= obj;
			}
			else
			{
				this.x -= obj;
				this.y -= y;
			}
		},
		
		/**
		 * Multiplies this vector by a value
		 * @this {AVector2}
		 * @param {number|AVector2} obj
		 * @param {number|null} y
		 */
		multiply: function(obj, y)
		{
			if (obj instanceof AVector2)
			{
				this.x *= obj.x;
				this.y *= obj.y;
			}
			else if (y == null)
			{
				this.x *= obj;
				this.y *= obj;
			}
			else
			{
				this.x *= obj;
				this.y *= y;
			}
		},
		
		/**
		 * Divides this vector by a value
		 * @this {AVector2}
		 * @param {number|AVector2} obj
		 * @param {number|null} y
		 */
		divide: function(obj, y)
		{
			if (obj instanceof AVector2)
			{
				this.x /= obj.x;
				this.y /= obj.y;
			}
			else if (y == null)
			{
				this.x /= obj;
				this.y /= obj;
			}
			else
			{
				this.x /= obj;
				this.y /= y;
			}
		},
		
		/**
		 * Gets the length of this vector
		 * @this {AVector2}
		 * @returns {number}
		 */
		length: function()
		{
			return Math.sqrt(this.x * this.x + this.y * this.y);
		},
		
		/**
		 * Gets the squared length of this vector
		 * @this {AVector2}
		 * @returns {number}
		 */
		sqrLength: function()
		{
			return this.x * this.x + this.y * this.y;
		},
		
		/**
		 * Turns this vector into an unit vector
		 * @this {AVector2}
		 */
		normalize: function()
		{
			var length = Math.sqrt(this.x * this.x + this.y * this.y);
			
			this.x /= length;
			this.y /= length;
		},
		
		/**
		 * Gets the distance from this vector to another
		 * @this {AVector2}
		 * @param {AVector2} other
		 * @returns {number}
		 */
		distance: function(other)
		{
			var dx = this.x - other.x;
			var dy = this.y - other.y;
			
			return Math.sqrt(dx * dx + dy * dy);
		},
		
		/**
		 * Gets the squared distance from this vector to another
		 * @this {AVector2}
		 * @param {AVector2} other
		 * @returns {number}
		 */
		sqrDistance: function(other)
		{
			var dx = this.x - other.x;
			var dy = this.y - other.y;
			
			return dx * dx + dy * dy;
		},
		
		/**
		 * Gets the scalar product of this vector with another
		 * @this {AVector2}
		 * @param {AVector2} other
		 * @returns {number}
		 */
		dot: function(other)
		{
			return this.x * other.x + this.y * other.y;
		},
		
		/**
		 * Gets this vector product of this vector with another
		 * @this {AVector2}
		 * @param {AVector2} other
		 * @returns {number}
		 */
		cross: function(other)
		{
			return this.x * other.y - other.x * this.y;
		},
		
		/**
		 * Gets the angle of the current vector or the angle formed with another
		 * @this {AVector2}
		 * @param {AVector2|null} other
		 */
		angle: function(other)
		{
			if (other == null)
				return AMath.atan(this.y / this.x);
			
			return AMath.acos(
					(this.x * other.x + this.y * other.y) /
					(
							Math.sqrt(this.x * this.x + this.y * this.y) +
							Math.sqrt(other.x * other.x + other.y * other.y)
					)
			);
		},
		
		/**
		 * Negates both coordinates
		 * @this {AVector2}
		 */
		negate: function()
		{
			this.x = -this.x;
			this.y = -this.y;
		},
		
		/**
		 * Clones this vector
		 * @this {AVector2}
		 * @returns {AVector2}
		 */
		clone: function()
		{
			return new AVector2(this.x, this.y);
		}
}

/**
 * Returns a vector with both coordinates set to 1
 * @public
 * @static
 * @returns {AVector2}
 */
AVector2.one = function()
{
	return new AVector2(1, 1);
}

/**
 * Returns a vector with the x-coordinate set to 1
 * @public
 * @static
 * @returns {AVector2}
 */
AVector2.unitX = function()
{
	return new AVector2(1, 0);
}

/**
 * Returns a vector with the y-coordinate set to 1
 * @public
 * @static
 * @returns {AVector2}
 */
AVector2.unitY = function()
{
	return new AVector2(0, 1);
}

/**
 * Returns a vector with both coordinates set to 0
 * @public
 * @static
 * @returns {AVector2}
 */
AVector2.zero = function()
{
	return new AVector2(0, 0);
}