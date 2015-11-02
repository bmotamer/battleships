/**
 * AAudioManager
 * @summary Manages the game's audio
 * @public
 * @constructor {AAudioManager}
 */
function AAudioManager()
{
	console.log("Initializing audio manager...");
	
	this._backgroundMusic = null;
	this._backgroundSound = null;
	
	this._soundEffects = new Array();
	
	console.log("Initializing audio manager... DONE!");
}

AAudioManager.prototype =
{
		/**
		 * Play BGM
		 * @summary Plays a background music
		 * @param {AAssetManager} assetManager
		 * @param {string} nickname
		 * @this {AAudioManager}
		 */
		playBGM: function(assetManager, nickname)
		{
			// If there was a music playing previously
			if (this._backgroundMusic != null)
			{
				// Stops it
				this._backgroundMusic.pause();
				this._backgroundMusic = null;
			}
			
			// Gets the desired music from the asset manager
			var asset = assetManager.getAudio(nickname);
			
			// If the music exists
			if (asset != null)
			{
				// Clones it
				this._backgroundMusic = asset._element.cloneNode(true);
				// Set it to loop
				this._backgroundMusic.loop = true;
				// Plays it
				this._backgroundMusic.play();
			}
		},
		
		/**
		 * Play SE
		 * @summary Plays a sound effect
		 * @param {AAssetManager} assetManager
		 * @param {string} nickname
		 * @this {AAudioManager}
		 */
		playSE: function(assetManager, nickname)
		{
			// Gets the desired sound from the asset manager
			var asset = assetManager.getAudio(nickname);
			
			// If the sound exists
			if (asset != null)
			{
				// Clones it
				var soundEffect = asset._element.cloneNode(true);
				// Adds the sound to the list
				this._soundEffects.push(soundEffect);
				// Add a reference to the sound of the list of sound effects
				soundEffect.list = this._soundEffects;
				// Because when it stops playing
				soundEffect.onended = function(event)
				{
					var soundEffect = event.target;
					
					// It's going to be removed from this list
					// We have to have a list of sound effects because later music effect will be implemented
					// and it fades all the other sounds while it's playing. So we don't wanna have a sound
					// effect floating around because we can't control it
					for (var i = 0; i < soundEffect.list.length; i++)
						if (soundEffect.list[i] == soundEffect)
						{
							soundEffect.list.splice(i, 1);
							break;
						}
					
					soundEffect.onended = null;
				}
				// Plays it
				soundEffect.play();
			}
		},
		
		/**
		 * Update
		 * @summary In the future it will handle the fading effects
		 * @param {number} deltaTime
		 * @this {AAudioManager}
		 */
		update: function(deltaTime)
		{
		}
}