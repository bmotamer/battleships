// Waits to load all DOM elements, images and etc
window.onload = function(event)
{ 
	// Creates a game manager with a screen size of 640x640 @ 60FPS
	var gameManager = new AGameManager(640, 640, 60);
	// Sets the first scene to be the title scene
	gameManager.getSceneManager().nextScene = new SceneTitle(gameManager);
	// Attaches the screen to a div
	gameManager.getGraphicsManager().setup(document.getElementById("canvasGoesHere"));
	
	// Runs the main loop
	(
		function run()
		{
			// If the game is not running anymore
			if (!gameManager.run())
				// Then just stop
				return;
			
			// Otherwise, get the calculated timeout. If it's 0,
			if (gameManager.getTimeout() <= 0)
				// Then there's no wait, run the loop again
				run();
			// If it's more than 0
			else
				// Wait for it and runs the loop again
				setTimeout(run, gameManager.getTimeout());
		}
	)();
}