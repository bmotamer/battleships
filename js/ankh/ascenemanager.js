/**
 * Manages the scene flow
 * @constructor {ASceneManager}
 */
function ASceneManager()
{
	console.log("Initializing scene manager...");
	
	this._currentScene        = null;
	this._currentSceneStarted = false;
	this.nextScene            = null;
	
	console.log("Initializing scene manager... DONE!");
}

ASceneManager.prototype =
{
		/**
		 * Returns if there is any scene running or incoming
		 * @this {ASceneManager}
		 * @returns {boolean}
		 */
		isRunning: function()
		{
			return (this._currentScene != null) || (this.nextScene != null);
		},
		
		/**
		 * Updates the scene flow and the current scene
		 * @this {ASceneManager}
		 * @param {AGameManager} gameManager
		 */
		update: function(gameManager)
		{
			// If there's not next scene
			if (this._currentScene == this.nextScene)
			{
				// Updates the current one
				if (this._currentScene != null)
					this._currentScene.update(gameManager);
			}
			// If there's a scene incoming
			else
			{
				// If the current one started already
				if (this._currentSceneStarted)
				{
					// Terminates it
					console.log("Scene manager: terminating scene...");
					this._currentScene.terminate(gameManager);
					console.log("Scene manager: terminating scene... DONE!");
					this._currentSceneStarted = false;
				}
				// If it hasn't started or was terminated
				else
				{
					// Goes to the new one
					this._currentScene = this.nextScene;
					
					if (this._currentScene != null)
					{
						// Starts the new one
						console.log("Scene manager: starting scene...");
						this._currentScene.start(gameManager);
						console.log("Scene manager: starting scene... DONE!");
						this._currentSceneStarted = true;
					}
				}
			}
		},
		
		/**
		 * Draws the current scene
		 * @this {ASceneManager}
		 * @param {AGameManager} gameManager
		 */
		draw: function(gameManager)
		{
			if (this._currentScene != null)
				this._currentScene.draw(gameManager);
		}
}