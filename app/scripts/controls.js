
window.Controls = (function() {
    'use strict';

    /**
     * Key codes we're interested in.
     */
    var KEYS = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        77: 'M',
        1: 'mouseDown'
    };

    /**
     * A singleton class which abstracts all player input,
     * should hide complexity of dealing with keyboard, mouse
     * and touch devices.
     * @constructor
     */
    var Controls = function() {
        this._didJump = false;
        this._isMuted = false;
        this.keys = {};
        $(window)
            .on('mousedown', this._mouseDown.bind(this))
            .on('mouseup', this._mouseUp.bind(this))
            .on('keydown', this._onKeyDown.bind(this))
            .on('keyup', this._onKeyUp.bind(this));
    };

    Controls.prototype._mouseDown = function(e){
        if (e.which === 1){
            this._didJump = true;
        }

        if (e.which in KEYS){
            var keyName = KEYS[e.which];
            this.keys[keyName] = true;
            return false;
        }
    }

    Controls.prototype._mouseUp = function(e){
        if(e.which in KEYS){
            var keyName = KEYS[e.which];
            this.keys[keyName] = false;
            return false;
        }
    }

    Controls.prototype._onKeyDown = function(e) {
        // Only jump if space wasn't pressed.
        if (e.keyCode === 32 && !this.keys.space) {
            this._didJump = true;
        }

        //Ef þú ýtir á M þá mutar leikinn
        if (e.keyCode === 77 && !this.keys.M){
            muteSound();
        }

        // Remember that this button is down.
        if (e.keyCode in KEYS) {
            var keyName = KEYS[e.keyCode];
            this.keys[keyName] = true;
            return false;
        }
    };

    Controls.prototype._onKeyUp = function(e) {
        if (e.keyCode in KEYS) {
            var keyName = KEYS[e.keyCode];
            this.keys[keyName] = false;
            return false;
        }
    };

    /**
     * Only answers true once until a key is pressed again.
     */
    Controls.prototype.didJump = function() {
        var answer = this._didJump;
        this._didJump = false;
        return answer;
    };

    Controls.prototype.isMuted = function() {
        var answer = this._isMuted;
        this._isMuted = false;
        return answer;
    };
    
    // Export singleton.
    return new Controls();
})();
