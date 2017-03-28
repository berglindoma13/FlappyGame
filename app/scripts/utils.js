/**
 * Cross browser RequestAnimationFrame
 */
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function() {
        'use strict';
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(/* function */ callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
}

function muteSound() {
    if(document.getElementById('MainThemeSong').paused){
        document.getElementById('MainThemeSong').currentTime = 0;
		document.getElementById('MainThemeSong').play();
		document.getElementById('MainThemeSong').volume = 1;
    }
    else{
        document.getElementById('MainThemeSong').pause();
    }
}

function scaleGame(){
    var fontSize = Math.min(
        window.innerWidth / 102.4,
        window.innerHeight / 57.6
    );
    $('.GameCanvas')[0].style.fontSize = fontSize + 'px';
}

$( window ).resize(scaleGame);