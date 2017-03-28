
/**
 * Bootstrap and start the game.
 */
$(function() {
    'use strict';

    var game = new window.Game($('.GameCanvas'));
    scaleGame();
    game.start();
});
