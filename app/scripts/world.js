/**
 * Created by Berglind on 20.3.2017.
 */
 window.World = (function() {
     'use strict';

     var SPEED = 30;
     var WIDTH = 20;

     var World = function(pipe1, pipe2,down, game, planet){
         this.game = game;
         this.pipe1 = pipe1;
         this.pipe2 = pipe2;
         this.down = down;
         this.planet = planet;

         this.pipe1.pos = {x: 0, y:0};
         this.pipe2.pos = {x: 0, y:0};
         this.down.pos = {x: 0, y: 0};
         this.planet.pos = {x: 0, y:0};

         this.pointsAdded = false;
     };

     World.prototype.reset = function(){
         var random = (Math.floor(Math.random() * 30) + 1) - 65;
         this.down.pos.x = 0;
         this.pipe1.pos.x = 120;
         this.pipe2.pos.x = 120;
         this.planet.pos.x = 220;

         //Upper pipe
         this.pipe2.pos.y = random;
         //Lower pipe
         this.pipe1.pos.y = random + 85;

         this.pipe1.css('transform', 'translateZ(0) translate(' + this.pipe1.pos.x + 'em, ' + this.pipe1.pos.y + 'em)');
         this.pipe2.css('transform', 'translateZ(0) translate(' + this.pipe2.pos.x + 'em, ' + this.pipe2.pos.y + 'em)');
         this.down.css('transform', 'translateZ(0) translate(' + this.down.pos.x + 'em, ' + this.down.pos.y + 'em)');
         this.planet.css('transform', 'translateZ(0) translate(' + this.planet.pos.x + 'em, ' + this.planet.pos.y + 'em)');
     };

     World.prototype.onFrame = function(delta){

         this.CheckCollisionWithPlayer();
         this.outOfBounds();

         this.down.pos.x -= (delta * SPEED);
         this.pipe1.pos.x -= (delta * SPEED);
         this.pipe2.pos.x -= (delta * SPEED);
         this.planet.pos.x -= (delta * SPEED*2);

         this.pipe1.css('transform', 'translateZ(0) translate(' + this.pipe1.pos.x + 'em, ' + this.pipe1.pos.y + 'em)');
         this.pipe2.css('transform', 'translateZ(0) translate(' + this.pipe2.pos.x + 'em, ' + this.pipe2.pos.y + 'em)');
         this.down.css('transform', 'translateZ(0) translate(' + this.down.pos.x + 'em, ' + this.down.pos.y + 'em)');
         this.planet.css('transform', 'translateZ(0) translate(' + this.planet.pos.x + 'em, ' + this.planet.pos.y + 'em)');
     };

     World.prototype.outOfBounds = function(){
         //THIS RESETS THE SCENE TO LOOK LIKE ITS CONSTANTLY MOVING
         if(this.pipe1.pos.x < -WIDTH){
             return this.reset();
         }
     };

     World.prototype.CheckCollisionWithPlayer = function(){
         //FIND HEIGHT AND WIDTH OF PIPE TO CHECK FOR COLLISION WITH PLAYER
         if(this.pipe1.pos.x >= 25 && this.pipe1.pos.x < 35){
            if(this.game.player.pos.y >= this.pipe1.pos.y + 2 || this.game.player.pos.y <= this.pipe2.pos.y + 68){
                this.game.gameover();
                this.game.player.PlayerDeath();
            }
            else if(this.pointsAdded === false){
                this.pointsAdded = true;
                this.game.player.AddScore();
            }
         }
         else{
            this.pointsAdded = false;
         }
     };

     return World;

 })();
