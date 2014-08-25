function Player( options ){
	var options = options === undefined ? {} : options;
	options.worldOptions = options.worldOptions === undefined ? {} : options.worldOptions;
	options.voidOptions = options.voidOptions === undefined ? {} : options.voidOptions;
	this.width = options.width === undefined ? 60 : options.width;
	this.height = options.height === undefined ? 140 : options.height;
	
	var _this = this;
	var oF = [];
	oF[12] = function(){console.log("hurt");};
	var textureOptions = {
		animations : {
			standing : {
				start : 0,
				end : 3,
				delay : 150,
			},
			running : {
				start : 5,
				end : 8,
				delay : 150,
			},
			jumping : {
				start : 4,
				end : 5,
				delay : 150,
			},
			fighting : {
				start : 9,
				end : 13,
				delay : 50,
			},
		},
		totalFrames : 14,
		onFrames : oF,
		currentAnimation : "standing",
		scale : new Vec2(_this.width/15,_this.height/35),
		position : new Vec2(12.5,0)
	};
	options.voidOptions.texture = new Texture(game.loader.get("heroVoid"), textureOptions);
	options.worldOptions.texture = new Texture(game.loader.get("hero"), textureOptions);
	
	PhaseEntity.call(this, options);
};
Player.prototype = Object.create( PhaseEntity.prototype );

Player.prototype.stopMotion = function(){
	this.angularVelocity = 0;
	this.acceleration.set(0,0);
	this.velocity.set(0,0);
};

Player.prototype.tick = function (dt){
	
	PhaseEntity.prototype.tick.call(this, dt);
	
};