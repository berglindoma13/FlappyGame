/**
 * Created by Berglind on 20.3.2017.
 */
 window.World = (function() {
     'use strict';

     var SPEED = 30;
     var WIDTH = 20;

     var World = function(pipe1, down, game){
         this.game = game;
         this.pipe1 = pipe1;
         this.down = down;

         this.pipe1.pos = {x: 0, y:0};
         this.down.pos = {x: 0, y: 0};
     };

     World.prototype.reset = function(){
         this.down.pos.x = 0;
         this.pipe1.pos.x = 120;

         //Change this to a random number
         this.pipe1.pos.y = 30;

         this.pipe1.css('transform', 'translateZ(0) translate(' + this.pipe1.pos.x + 'em, ' + this.pipe1.pos.y + 'em)');
         this.down.css('transform', 'translateZ(0) translate(' + this.down.pos.x + 'em, ' + this.down.pos.y + 'em)');
     };

     World.prototype.onFrame = function(delta){

         this.CheckCollisionWithPlayer();
         this.outOfBounds();

         this.down.pos.x -= (delta * SPEED);
         this.pipe1.pos.x -= (delta * SPEED);

         this.pipe1.css('transform', 'translateZ(0) translate(' + this.pipe1.pos.x + 'em, ' + this.pipe1.pos.y + 'em)');
         this.down.css('transform', 'translateZ(0) translate(' + this.down.pos.x + 'em, ' + this.down.pos.y + 'em)');
     };

     World.prototype.outOfBounds = function(){
         //THIS RESETS THE SCENE TO LOOK LIKE ITS CONSTANTLY MOVING
         if(this.pipe1.pos.x < -WIDTH){
             return this.reset();
         }
     };

     World.prototype.CheckCollisionWithPlayer = function(){
         //FIND HEIGHT AND WIDTH OF PIPE TO CHECK FOR COLLISION WITH PLAYER

     };

     return World;
 })();
