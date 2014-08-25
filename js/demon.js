function Demon( options ){
	var options = options === undefined ? {} : options;
	
	PhaseEntity.call(this, options);
	
	
	this.colliding = true;
	
	this.jumping = false;
	this.figthing = false;
	this.running = false;
};
Demon.prototype = Object.create( PhaseEntity.prototype );

Demon.prototype.toPlayer = function (){
	return v = new Vec2().subVectors(game.player.position, this.position);
};

Demon.prototype.tick = function (dt){
	var smer = this.toPlayer();
	this.velocity = new Vec2(30,0).rotate(smer.getAngle());
	
	PhaseEntity.prototype.tick.call(this, dt);
};