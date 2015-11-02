/**
 * Tile
 * @constructor {Tile}
 * @param {Ship|null}
 */
function Tile(ship)
{
	this._ship = ship;
	this._shot = false;
}

Tile.prototype =
{
		/**
		 * Hits the tile, returns if the tile contained part of a ship
		 * @this {Tile}
		 * @returns {Ship|null}
		 */
		hit: function()
		{
			this._shot = true;
			
			if (this._ship instanceof Ship)
			{
				this._ship.hit();
				return this._ship;
			}
			
			return null;
		},
		
		/**
		 * Returns if the tile was shot already
		 * @this {Tile}
		 * @returns {boolean}
		 */
		wasShot: function()
		{
			return this._shot;
		}
}