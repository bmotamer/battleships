/**
 * AMath
 * @public
 * @static
 */
function AMath() {}

AMath.PI      = 3.14159265359;
AMath.Deg2Rad = 0.01745329251;
AMath.Rad2Deg = 57.2957795131;

(
	/**
	 * Initialize
	 * @private
	 * @static
	 */
	AMath._initialize = function()
	{
		// Creates tables for sine, cosine and tangent
		AMath._sinTable = new Array(181);
		AMath._cosTable = new Array(181);
		AMath._tanTable = new Array(181);
		
		var radians = 0;
		
		// Calculates the sine, cosine and tangent of the angles from 0 to 180 and store those values
		// to the teables
		for (var degrees = 0; degrees <= 180; degrees++)
		{
			AMath._sinTable[degrees] = Math.sin(radians);
			AMath._cosTable[degrees] = Math.cos(radians);
			AMath._tanTable[degrees] = Math.tan(radians);
			
			radians += 0.01745329251;
		}
	}
)();

/**
 * Modulo
 * @summary Gets the positive remainder of a value
 * @public
 * @static
 * @param {number} value
 * @param {number} cycle
 * @returns {number}
 */
AMath.modulo = function(value, cycle)
{
	// Gets the remainder
	value %= cycle;
	
	// If the value is negative
	if (value < 0)
		// Adds one cycle
		value += cycle;
	
	return value;
}

/**
 * Clamp
 * @summary Clamps a value
 * @public
 * @statics
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
AMath.clamp = function(value, min, max)
{
	return value < min ? min : value > max ? max : value;
}

/**
 * Sin
 * @summary Gets the sine of an angle
 * @public
 * @static
 * @param {number} roundedDegrees
 * @returns {number}
 */
AMath.sin = function(roundedDegrees)
{
	// Calculates how many halfs there are in the given angle
	var halfs = (roundedDegrees / 180) | 0;
	var sign;
	
	// If there are none
	if (halfs == 0)
		// Then the result sign is if the angle is negative or not
		sign = roundedDegrees < 0;
	else
	{
		// Gets the angle remainder
		roundedDegrees -= halfs * 180;
		
		// If the angle is negative
		if (roundedDegrees < 0)
		{
			// Makes it positive
			roundedDegrees += 180;
			// The result is signed if it's even
			sign = (halfs & 1) == 0;
		}
		// If the angle is positive
		else
			// The result is signed if it's odd
			sign = (halfs & 1) == 1;
	}
	
	// It's possible to use a table with 91 elements only, but that way more calculations have to
	// be done, so that's the fastest way. Halfs change the angle sign.
	if (sign)
		return -AMath._sinTable[roundedDegrees];
	
	// Same logic goes for cosine and tangent
	return AMath._sinTable[roundedDegrees];
}

/**
 * Cosine
 * @summary Gets the cosine of an angle
 * @public
 * @static
 * @param {number} roundedDegrees
 * @returns {number}
 */
AMath.cos = function(roundedDegrees)
{
	var halfs = (roundedDegrees / 180) | 0;
	var sign;
	
	if (halfs == 0)
		sign = roundedDegrees < 0;
	else
	{
		roundedDegrees -= halfs * 180;
		
		if (roundedDegrees < 0)
		{
			roundedDegrees += 180;
			sign = (halfs & 1) == 0;
		}
		else
			sign = (halfs & 1) == 1;
	}
	
	if (sign)
		return -AMath._cosTable[roundedDegrees];
	
	return AMath._cosTable[roundedDegrees];
}

/**
 * Tangent
 * @summary Gets the tangent of an angle
 * @public
 * @static
 * @param {number} roundedDegrees
 * @returns {number}
 */
AMath.tan = function(roundedDegrees)
{
	var halfs = (roundedDegrees / 180) | 0;
	var sign;
	
	if (halfs == 0)
		sign = roundedDegrees < 0;
	else
	{
		roundedDegrees -= halfs * 180;
		
		if (roundedDegrees < 0)
		{
			roundedDegrees += 180;
			sign = (halfs & 1) == 0;
		}
		else
			sign = (halfs & 1) == 1;
	}
	
	if (sign)
		return -AMath._tanTable[roundedDegrees];
	
	return AMath._tanTable[roundedDegrees];
}

/**
 * Asin
 * @summary Gets the arc of a sine
 * @public
 * @static
 * @param {number} sine
 * @returns {number}
 */
AMath.asin = function(sine)
{
	// This might not be the most effective way but...
	var sign;
	
	// Gets if the sine is negative
	if (sine < 0)
	{
		// If it is, make it positive and saves that it was negative before
		sine = -sine;
		sign = true;
	}
	// If it is positive
	else
		// Saves that it is positive
		sign = false;
	
	// Then tries to find the most approximate angle for the given sine
	for (var degrees = 0; degrees <= 89; degrees++)
		// When it finds the most accurate one
		if (sine < AMath._sinTable[degrees + 1])
		{
			// Returns it
			if (sign)
				return -degrees;
			
			return degrees;
		}
	
	return Number.NaN;
}

/**
 * Acos
 * @summary Gets the arc of a cosine
 * @public
 * @static
 * @param {number} cosine
 * @returns {number}
 */
AMath.acos = function(cosine)
{
	var sign;
	
	if (cosine < 0)
	{
		cosine = -cosine;
		sign   = true;
	}
	else
		sign = false;
	
	for (var degrees = 90; degrees >= 0; degrees--)
		if (cosine < AMath._cosTable[degrees + 1])
		{
			if (sign)
				return -degrees;
			
			return degrees;
		}
	
	return Number.NaN;
}

/**
 * Atan
 * @summary Gets the arc of a tangent
 * @public
 * @static
 * @param {number} tangent
 * @returns {number}
 */
AMath.atan = function(tangent)
{
	var sign;
	
	if (tangent < 0)
	{
		tangent = -tangent;
		sign    = true;
	}
	else
		sign = false;
	
	for (var degrees = 0; degrees <= 89; degrees++)
		if (tangent < AMath._tanTable[degrees + 1])
		{
			if (sign)
				return -degrees;
			
			return degrees;
		}
	
	return Number.NaN;
}