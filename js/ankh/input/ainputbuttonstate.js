/**
 * AInputButtonState
 * @summary Defines a generic button state
 * @public
 * @enum
 */
var AInputButtonState =
{
		NONE     : 0, // Unpressed
		TRIGGERED: 1, // Just pressed
		PRESSED  : 2, // Pressed
		REPEATED : 4, // Repeated
		DOWN     : 7, // Pressed, Just Pressed or Repeated
		RELEASED : 8, // Unpressed or Just Released
		UP       : 8  // Just Released
}