window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;

	var currentScore = 0;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.rotate = 0;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;

		currentScore = 0;
		document.getElementById('CurrentScore').innerHTML = 0;

	};

	Player.prototype.onFrame = function(delta) {
		//Festa fuglinn á miðjum skjánum
		/*if(Controls.keys.space){
	        this.pos.y = delta * SPEED;
        }
        else{
	        this.pos.y = delta * SPEED;
        }*/

	    if(Controls.keys.space){
	        this.pos.y -= delta * SPEED + 1;
			this.rotate = -20;
        }
        else{
	        this.pos.y += delta * SPEED + 0.1;
			this.rotate += delta * SPEED + 1;
        }



		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)' + 'rotate(' + this.rotate + 'deg)');
	};

	Player.prototype.AddScore = function(){
	    currentScore += 1;
	    document.getElementById('CurrentScore').innerHTML = currentScore;
    };


	Player.prototype.GetGameScore = function(){
	    return currentScore;
    };

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}
	};

	return Player;

})();
