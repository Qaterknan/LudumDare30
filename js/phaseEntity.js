function PhaseEntity( options ){
	var options = options === undefined ? {} : options;
	
	PhaseObject.call(this, options);
	
	this.health = options.health === undefined ? 100 : options.health;
	
	this.colliding = true;
	
	this.jumping = false;
	this.figthing = false;
	this.running = false;
};
PhaseEntity.prototype = Object.create( PhaseObject.prototype );

PhaseEntity.prototype.stopMotion = function(){
	this.angularVelocity = 0;
	this.acceleration.set(0,0);
	this.velocity.set(0,0);
};

PhaseEntity.prototype.tick = function (dt){
	
	if(this.fighting && this.texture.animations["fighting"]){
		this.texture.switchAnimation("fighting");
	}
	else {
		if(this.jumping && this.texture.animations["jumping"]){
			this.texture.switchAnimation("jumping");
		}
	else {
		if(this.running && this.texture.animations["running"]){
			this.texture.switchAnimation("running");
		}
		else
			this.texture.switchAnimation("standing");
		}
	}
	
	
	PhaseObject.prototype.tick.call(this, dt);
	
	if(this.health <= 0)
		this.die();
};

PhaseEntity.prototype.onCollision = function (obj, dt){
	if(obj.id == "street"){
		if(this.velocity.y > 0){
			this.position.y -= this.velocity.y*dt;
			this.velocity.y = 0;
		}
		this.jumping = false;
	}
	if(obj.id == "wall"){
		var kladnySmer = obj.position.x - this.position.x > 0;
		this.position.x -= this.velocity.x*dt;
		this.velocity.x = 0;
		this.running = false;
	}
	if(obj instanceof PhaseEntity){
		/*this.position.x -= this.velocity.x*dt;
		this.velocity.x = 0;*/
		this.position.sub(this.velocity.multiplyScalar(dt));
		this.velocity.multiplyScalar(0);
		this.running = false;
		this.onEntityCollision(obj);
	}
};

PhaseEntity.prototype.onEntityCollision = function (){
	
};

PhaseEntity.prototype.die = function (){
	for(var i in this.parent.children){
		if(this.parent.children[i] == this){
			this.parent.children.splice(i,1),
			delete this;
		}
	};
};