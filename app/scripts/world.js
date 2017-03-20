/**
 * Created by Berglind on 20.3.2017.
 */
 window.World = (function() {
     'use strict';

     var SPEED = 30;

     var World = function(down, game){
         this.game = game;

         this.down = down;
       this.down.pos = {x: 0, y: 0};
     };

     World.prototype.reset = function(){
         this.down.pos.x = 0;

         this.down.css('transform', 'translateZ(0) translate(' + this.down.pos.x + 'em, ' + this.down.pos.y + 'em)');
     };

     World.prototype.onFrame = function(delta){

         this.down.pos.x += (delta * SPEED);
         this.down.css('transform', 'translateZ(0) translate(' + this.down.pos.x + 'em, ' + this.down.pos.y + 'em)');
     };

     return World;
 })();
