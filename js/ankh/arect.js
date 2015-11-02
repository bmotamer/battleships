/**
 * Rectangle
 * @constructor {ARect}
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 */
function ARect(x, y, width, height)
{
	this.x      = x;
	this.y      = y;
	this.width  = width;
	this.height = height;
}

ARect.prototype =
{
	/**
	 * Gets the top of this rectangle
	 * @returns {number}
	 */
	top: function() { return this.y; },
	
	/**
	 * Gets the left of this rectangle
	 * @returns {number}
	 */
	left: function() { return this.x; },
	
	/**
	 * Gets the right of this rectangle
	 * @returns {number}
	 */
	right: function() { return this.x + this.width; },
	
	/**
	 * Gets the bottom of this rectangle
	 * @returns {number}
	 */
	bottom: function() { return this.y + this.height; },
	
	/**
	 * Returns if this rectangle contains a given point
	 * @param {number} x
	 * @param {number} y
	 * @returns {boolean}
	 */
	contains: function (x, y)
	{
		return !(
			(x <   this.x               ) ||
			(y <   this.y               ) ||
			(x >= (this.x + this.width )) ||
			(y >= (this.y + this.height))
		);
	},
	
	/**
	 * Returns if this rectangle intersects with another
	 * @param {ARect} other
	 * @returns {boolean}
	 */
	intersects: function(other)
	{
		return !(
			( this.x                >= (other.x + other.width )) ||
			((this.x + this.width ) <=  other.x                ) ||
			( this.y                >= (other.y + other.height)) ||
			((this.y + this.height) <=  other.y                )
		);
	}
}