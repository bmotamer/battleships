/**
 * AMap
 * @summary Creates a unidimensional array behaving like a two dimensional one
 * @public
 * @constructor {AMap}
 * @param {number} width
 * @param {number} height
 */
function AMap(width, height)
{
	this._width  = width;
	this._height = height;
	this._area   = width * height;
	this._data   = new Array(this._area);
}

AMap.prototype =
{
		/**
		 * Width
		 * @summary Gets this map's width
		 * @public
		 * @this {AMap}
		 * @returns {number}
		 */
		getWidth: function()
		{
			return this._width;
		},
		
		/**
		 * Height
		 * @summary Gets this map's height
		 * @public
		 * @this {AMap}
		 * @returns {number}
		 */
		getHeight: function()
		{
			return this._height;
		},
		
		/**
		 * Area
		 * @summary Gets this map's area
		 * @public
		 * @this {AMap}
		 * @returns {number}
		 */
		getArea: function()
		{
			return this._length;
		},
		
		/**
		 * Index
		 * @summary Gets an index from this map
		 * @public
		 * @this {AMap}
		 * @param {number} index
		 */
		getIndex: function(index)
		{
			return this._data[index];
		},
		
		/**
		 * Index
		 * @summary Sets the value of an index from the map
		 * @public
		 * @param {number} index
		 * @param {*} value
		 * @this {AMap}
		 */
		setIndex: function(index, value)
		{
			this._data[index] = value;
		},
		
		/**
		 * Position
		 * @summary Gets a position from this map
		 * @public
		 * @param {number} x
		 * @param {number} y
		 * @returns {*}
		 * @this {AMap}
		 */
		getPosition: function(x, y)
		{
			return this._data[x + y * this._width];
		},
		
		/**
		 * Position
		 * @summary Sets the value from a position of this map
		 * @public
		 * @param {number} x
		 * @param {number} y
		 * @param {*} value
		 * @this {AMap}
		 */
		setPosition: function(x, y, value)
		{
			this._data[x + y * this._width] = value;
		}
}