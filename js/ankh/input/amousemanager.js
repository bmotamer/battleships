/**
 * Manages the mouse
 * @constructor {AMouseManager}
 * @param {HTMLElement} element
 */
function AMouseManager(element)
{
	console.log("Initializing mouse manager...");
	
	this._position      = AVector2.zero();
	this._clicked       = false;
	this._contextMenu   = false;
	this._doubleClicked = false;
	this._buttonsLength = 3;
	this._buttons       = new Array(this._buttonsLength);
	this._inbounds      = false;
	
	this._initialize();
	
	element.mouseManager  = this;
	element.onclick       = AMouseManager._onClick;
	element.oncontextmenu = AMouseManager._onContextMenu;
	element.ondblclick    = AMouseManager._onDoubleClick;
	element.onmousedown   = AMouseManager._onMouseDown;
	element.onmouseenter  = AMouseManager._onMouseEnter;
	element.onmouseleave  = AMouseManager._onMouseLeave;
	element.onmousemove   = AMouseManager._onMouseMove;
	element.onmouseover   = AMouseManager._onMouseOver;
	element.onmouseout    = AMouseManager._onMouseOut;
	element.onmouseup     = AMouseManager._onMouseUp;
	
	console.log("Initializing mouse manager... DONE!");
}

AMouseManager.prototype =
{
		/**
		 * Initializes the mouse class
		 * @this {AMouseManager}
		 */
		_initialize: function()
		{
			for (var i = 0; i < this._buttonsLength; i++)
				this._buttons[i] = new AInputButton();
		},
		
		/**
		 * Gets the mouse position
		 * @this {AMouseManager}
		 * @returns {AVector2}
		 */
		getPosition: function()
		{
			return this._position.clone();
		},
		
		/**
		 * Gets if just clicked
		 * @this {AMouseManager}
		 * @returns {boolean}
		 */
		clicked: function()
		{
			return this._clicked;
		},
		
		/**
		 * Gets if just double clicked
		 * @this {AMouseManager}
		 * @returns {boolean}
		 */
		doubleClicked: function()
		{
			return this._doubleClicked;
		},
		
		/**
		 * Updates the mouse state
		 * @this {AMouseManager}
		 * @param {number} deltaTime
		 */
		update: function(deltaTime)
		{
			this._clicked       = false;
			this._doubleClicked = false;
			
			for (var  i = 0; i < this._buttonsLength; i++)
				this._buttons[i].update(deltaTime);
		}
}

AMouseManager._onClick = function(event)
{
	var element      = event.target;
	var mouseManager = element.mouseManager;
	
	mouseManager._clicked = true;
	mouseManager._inbounds   = true;
	
	var rect = element.getBoundingClientRect();
	mouseManager._position.x = event.clientX - rect.left;
	mouseManager._position.y = event.clientY - rect.top;
}

AMouseManager._onContextMenu = function(event)
{
	var element      = event.target;
	var mouseManager = element.mouseManager;
	
	mouseManager._contextMenu = true;
	mouseManager._inbounds   = true;
	
	var rect = element.getBoundingClientRect();
	mouseManager._position.x = event.clientX - rect.left;
	mouseManager._position.y = event.clientY - rect.top;
}

AMouseManager._onDoubleClick = function(event)
{
	var element      = event.target;
	var mouseManager = element.mouseManager;
	
	mouseManager._doubleClicked = true;
	mouseManager._inbounds   = true;
	
	var rect = element.getBoundingClientRect();
	mouseManager._position.x = event.clientX - rect.left;
	mouseManager._position.y = event.clientY - rect.top;
}

AMouseManager._onMouseDown = function(event)
{
	var mouseManager = event.target.mouseManager;
	var buttonID     = event.button;
	
	if (buttonID < mouseManager._buttonsLength)
		mouseManager._buttons[buttonID].isDown = true;
	else
	{
		mouseManager._buttonsLength = buttonID + 1;
		
		var button = new AInputButton();
		button.isDown = true;
		
		mouseManager._buttons[buttonID] = button;
		
		for (var i = buttonID - 1; i >= 0; i--)
			if (mouseManager._buttons[i] == null)
				mouseManager._buttons[i] = new AInputButton();
			else
				break;
	}
}

AMouseManager._onMouseEnter = function(event)
{
	var element      = event.target;
	var mouseManager = element.mouseManager;
	
	mouseManager._inbounds   = true;
	
	var rect = element.getBoundingClientRect();
	mouseManager._position.x = event.clientX - rect.left;
	mouseManager._position.y = event.clientY - rect.top;
}

AMouseManager._onMouseLeave = function(event)
{
	var element      = event.target;
	var mouseManager = element.mouseManager;
	
	mouseManager._inbounds   = false;
	
	var rect = element.getBoundingClientRect();
	mouseManager._position.x = event.clientX - rect.left;
	mouseManager._position.y = event.clientY - rect.top;
}

AMouseManager._onMouseMove = function(event)
{
	var element      = event.target;
	var mouseManager = element.mouseManager;
	
	mouseManager._inbounds   = true;
	
	var rect = element.getBoundingClientRect();
	mouseManager._position.x = event.clientX - rect.left;
	mouseManager._position.y = event.clientY - rect.top;
}

AMouseManager._onMouseOver = function(event)
{
	var element      = event.target;
	var mouseManager = element.mouseManager;
	
	mouseManager._inbounds   = true;
	mouseManager._position.x = event.x;
	mouseManager._position.y = event.y;
	
	var rect = element.getBoundingClientRect();
	mouseManager._position.x = event.clientX - rect.left;
	mouseManager._position.y = event.clientY - rect.top;
}

AMouseManager._onMouseOut = function(event)
{
	var element      = event.target;
	var mouseManager = element.mouseManager;
	
	mouseManager._inbounds   = false;
	
	var rect = element.getBoundingClientRect();
	mouseManager._position.x = event.clientX - rect.left;
	mouseManager._position.y = event.clientY - rect.top;
}

AMouseManager._onMouseUp = function(event)
{
	var mouseManager = event.target.mouseManager;
	var buttonID     = event.button;
	
	if (buttonID < mouseManager._buttonsLength)
		mouseManager._buttons[buttonID].isDown = false;
	else
	{
		mouseManager._buttonsLength = buttonID + 1;
		
		var button = new AInputButton();
		button.isDown = false;
		
		mouseManager._buttons[buttonID] = button;
		
		for (var i = buttonID - 1; i >= 0; i--)
			if (mouseManager._buttons[i] == null)
				mouseManager._buttons[i] = new AInputButton();
			else
				break;
	}
}