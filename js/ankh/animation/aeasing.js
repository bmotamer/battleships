/**
 * AEasing
 * @summary Animation smoothing
 * @public
 * @static
 */
function AEasing() {}

/**
 * Linear Tween
 * @summary Linear transition, no smoothing
 * @public
 * @static
 * @param {number} elapsedTime
 * @param {number} startValue
 * @param {number} changeInValue
 * @param {number} duration
 * @returns {number}
 */
AEasing.linearTween = function(elapsedTime, startValue, changeInValue, duration)
{
	return changeInValue * elapsedTime / duration + startValue;
};

/**
 * Quadratic Easing In
 * @summary Quadractic transition
 * @public
 * @static
 * @param {number} elapsedTime
 * @param {number} startValue
 * @param {number} changeInValue
 * @param {number} duration
 * @returns {number}
 */
AEasing.easeInQuad = function(elapsedTime, startValue, changeInValue, duration)
{
	elapsedTime /= duration;
	
	return changeInValue * elapsedTime * elapsedTime + startValue;
};

/**
 * Quadratic Easing Out
 * @summary Quadractic transition
 * @public
 * @static
 * @param {number} elapsedTime
 * @param {number} startValue
 * @param {number} changeInValue
 * @param {number} duration
 * @returns {number}
 */
AEasing.easeOutQuad = function(elapsedTime, startValue, changeInValue, duration)
{
	elapsedTime /= duration;
	
	return -changeInValue * elapsedTime * (elapsedTime - 2) + startValue;
};

/**
 * Quadratic Easing In and Out
 * @summary Quadractic transition
 * @public
 * @static
 * @param {number} elapsedTime
 * @param {number} startValue
 * @param {number} changeInValue
 * @param {number} duration
 * @returns {number}
 */
AEasing.easeInOutQuad = function(elapsedTime, startValue, changeInValue, duration)
{
	elapsedTime /= duration / 2;
	
	if (elapsedTime < 1)
		return changeInValue / 2 * elapsedTime * elapsedTime + startValue;
	
	elapsedTime--;
	
	return -changeInValue / 2 * (elapsedTime * (elapsedTime - 2) - 1) + startValue;
};

/**
 * Cubic Easing In
 * @summary Cubic transition
 * @public
 * @static
 * @param {number} elapsedTime
 * @param {number} startValue
 * @param {number} changeInValue
 * @param {number} duration
 * @returns {number}
 */
AEasing.easeInCubic = function(elapsedTime, startValue, changeInValue, duration)
{
	elapsedTime /= duration;
	
	return changeInValue * elapsedTime * elapsedTime * elapsedTime + startValue;
};

/**
 * Cubic Easing Out
 * @summary Cubic transition
 * @public
 * @static
 * @param {number} elapsedTime
 * @param {number} startValue
 * @param {number} changeInValue
 * @param {number} duration
 * @returns {number}
 */
AEasing.easeOutCubic = function(elapsedTime, startValue, changeInValue, duration)
{
	elapsedTime /= duration;
	elapsedTime--;
	
	return changeInValue * (elapsedTime * elapsedTime * elapsedTime + 1) + startValue;
};

/**
 * Cubic Easing In and Out
 * @summary Cubic transition
 * @public
 * @static
 * @param {number} elapsedTime
 * @param {number} startValue
 * @param {number} changeInValue
 * @param {number} duration
 * @returns {number}
 */
AEasing.easeInOutCubic = function(elapsedTime, startValue, changeInValue, duration)
{
	elapsedTime /= duration / 2;
	
	if (elapsedTime < 1)
		return changeInValue / 2 * elapsedTime * elapsedTime * elapsedTime + startValue;
	
	elapsedTime -= 2;
	
	return changeInValue / 2 * (elapsedTime * elapsedTime * elapsedTime + 2) + startValue;
};

/**
 * Quartic Easing In
 * @summary Quartic transition
 * @public
 * @static
 * @param {number} elapsedTime
 * @param {number} startValue
 * @param {number} changeInValue
 * @param {number} duration
 * @returns {number}
 */
AEasing.easeInQuart = function(elapsedTime, startValue, changeInValue, duration)
{
	elapsedTime /= duration;
	
	return changeInValue * elapsedTime * elapsedTime * elapsedTime * elapsedTime + startValue;
};

/**
 * Quartic Easing Out
 * @summary Quartic transition
 * @public
 * @static
 * @param {number} elapsedTime
 * @param {number} startValue
 * @param {number} changeInValue
 * @param {number} duration
 * @returns {number}
 */
AEasing.easeOutQuart = function(elapsedTime, startValue, changeInValue, duration)
{
	elapsedTime /= duration;
	elapsedTime--;
	
	return -changeInValue * (elapsedTime * elapsedTime * elapsedTime * elapsedTime - 1) + startValue;
};

/**
 * Quartic Easing In and Out
 * @summary Quartic transition
 * @public
 * @static
 * @param {number} elapsedTime
 * @param {number} startValue
 * @param {number} changeInValue
 * @param {number} duration
 * @returns {number}
 */
AEasing.easeInOutQuart = function(elapsedTime, startValue, changeInValue, duration)
{
	elapsedTime /= duration / 2;
	
	if (elapsedTime < 1)
		return changeInValue / 2 * elapsedTime * elapsedTime * elapsedTime * elapsedTime + startValue;
	
	elapsedTime -= 2;
	
	return -changeInValue / 2 * (elapsedTime * elapsedTime * elapsedTime * elapsedTime - 2) + startValue;
};

/**
 * Quintic Easing In
 * @summary Quintic transition
 * @public
 * @static
 * @param {number} elapsedTime
 * @param {number} startValue
 * @param {number} changeInValue
 * @param {number} duration
 * @returns {number}
 */
AEasing.easeInQuint = function(elapsedTime, startValue, changeInValue, duration)
{
	elapsedTime /= duration;
	
	return changeInValue * elapsedTime * elapsedTime * elapsedTime * elapsedTime * elapsedTime + startValue;
};

/**
 * Quintic Easing Out
 * @summary Quintic transition
 * @public
 * @static
 * @param {number} elapsedTime
 * @param {number} startValue
 * @param {number} changeInValue
 * @param {number} duration
 * @returns {number}
 */
AEasing.easeOutQuint = function(elapsedTime, startValue, changeInValue, duration)
{
	elapsedTime /= duration;
	elapsedTime--;
	
	return changeInValue * (elapsedTime * elapsedTime * elapsedTime * elapsedTime * elapsedTime + 1) + startValue;
};

/**
 * Quintic Easing In and Out
 * @summary Quintic transition
 * @public
 * @static
 * @param {number} elapsedTime
 * @param {number} startValue
 * @param {number} changeInValue
 * @param {number} duration
 * @returns {number}
 */
AEasing.easeInOutQuint = function(elapsedTime, startValue, changeInValue, duration)
{
	elapsedTime /= duration / 2;
	
	if (elapsedTime < 1)
		return changeInValue / 2 * elapsedTime * elapsedTime * elapsedTime * elapsedTime * elapsedTime + startValue;
	
	elapsedTime -= 2;
	
	return changeInValue / 2 * (elapsedTime * elapsedTime * elapsedTime * elapsedTime * elapsedTime + 2) + startValue;
};

/**
 * Sine Easing In
 * @summary Sine transition
 * @public
 * @static
 * @param {number} elapsedTime
 * @param {number} startValue
 * @param {number} changeInValue
 * @param {number} duration
 * @returns {number}
 */
AEasing.easeInSine = function(elapsedTime, startValue, changeInValue, duration)
{
	return -changeInValue * AMath.cos(Math.round(elapsedTime / duration * 90)) + changeInValue + startValue;
};

/**
 * Sine Easing Out
 * @summary Sine transition
 * @public
 * @static
 * @param {number} elapsedTime
 * @param {number} startValue
 * @param {number} changeInValue
 * @param {number} duration
 * @returns {number}
 */
AEasing.easeOutSine = function(elapsedTime, startValue, changeInValue, duration)
{
	return changeInValue * AMath.sin(Math.round(elapsedTime / duration * 90)) + startValue;
};

/**
 * Sine Easing In and Out
 * @summary Sine transition
 * @public
 * @static
 * @param {number} elapsedTime
 * @param {number} startValue
 * @param {number} changeInValue
 * @param {number} duration
 * @returns {number}
 */
AEasing.easeInOutSine = function(elapsedTime, startValue, changeInValue, duration)
{
	return -changeInValue / 2 * (AMath.cos(Math.round(180 * elapsedTime / duration)) - 1) + startValue;
};

/**
 * Exponential Easing In
 * @summary Exponential transition
 * @public
 * @static
 * @param {number} elapsedTime
 * @param {number} startValue
 * @param {number} changeInValue
 * @param {number} duration
 * @returns {number}
 */
AEasing.easeInExpo = function(elapsedTime, startValue, changeInValue, duration)
{
	return changeInValue * Math.pow(2, 10 * (elapsedTime / duration - 1)) + startValue;
};

/**
 * Exponential Easing Out
 * @summary Exponential transition
 * @public
 * @static
 * @param {number} elapsedTime
 * @param {number} startValue
 * @param {number} changeInValue
 * @param {number} duration
 * @returns {number}
 */
AEasing.easeOutExpo = function(elapsedTime, startValue, changeInValue, duration)
{
	return changeInValue * (-Math.pow( 2, -10 * elapsedTime / duration) + 1) + startValue;
};

/**
 * Exponential Easing In and Out
 * @summary Exponential transition
 * @public
 * @static
 * @param {number} elapsedTime
 * @param {number} startValue
 * @param {number} changeInValue
 * @param {number} duration
 * @returns {number}
 */
AEasing.easeInOutExpo = function(elapsedTime, startValue, changeInValue, duration)
{
	elapsedTime /= duration / 2;
	
	if (elapsedTime < 1)
		return changeInValue / 2 * Math.pow( 2, 10 * (elapsedTime - 1)) + startValue;
	
	elapsedTime--;
	
	return changeInValue / 2 * (-Math.pow( 2, -10 * elapsedTime) + 2) + startValue;
};

/**
 * Circular Easing In
 * @summary Circular transition
 * @public
 * @static
 * @param {number} elapsedTime
 * @param {number} startValue
 * @param {number} changeInValue
 * @param {number} duration
 * @returns {number}
 */
AEasing.easeInCirc = function(elapsedTime, startValue, changeInValue, duration)
{
	elapsedTime /= duration;
	
	return -changeInValue * (Math.sqrt(1 - elapsedTime * elapsedTime) - 1) + startValue;
};

/**
 * Circular Easing Out
 * @summary Circular transition
 * @public
 * @static
 * @param {number} elapsedTime
 * @param {number} startValue
 * @param {number} changeInValue
 * @param {number} duration
 * @returns {number}
 */
AEasing.easeOutCirc = function(elapsedTime, startValue, changeInValue, duration)
{
	elapsedTime /= duration;
	elapsedTime--;
	
	return changeInValue * Math.sqrt(1 - elapsedTime * elapsedTime) + startValue;
};

/**
 * Circular Easing In and Out
 * @summary Circular transition
 * @public
 * @static
 * @param {number} elapsedTime
 * @param {number} startValue
 * @param {number} changeInValue
 * @param {number} duration
 * @returns {number}
 */
AEasing.easeInOutCirc = function(elapsedTime, startValue, changeInValue, duration)
{
	elapsedTime /= duration / 2;
	
	if (elapsedTime < 1)
		return -changeInValue / 2 * (Math.sqrt(1 - elapsedTime * elapsedTime) - 1) + startValue;
	
	elapsedTime -= 2;
	
	return changeInValue / 2 * (Math.sqrt(1 - elapsedTime * elapsedTime) + 1) + startValue;
};