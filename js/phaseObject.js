function PhaseObject( options ){
	var options = options === undefined ? {} : options;
	Object2D.call(this, options)
	options.worldOptions === undefined ? options.worldOptions = {} : false;
	this.phaseOptions = {
		World : options.worldOptions,
		Void : options.voidOptions === undefined ? {} : options.voidOptions,
	};
	this.phase = options.phase === undefined ? "World" : options.phase;
	for(var i in this.phaseOptions[this.phase]){
		this[i] = this.phaseOptions[this.phase][i];
	};
	
};
PhaseObject.prototype = Object.create( Object2D.prototype );

PhaseObject.prototype.tick = function (dt){
	Object2D.prototype.tick.call(this, dt);
	
	if(game.status.currentPhase != this.phase)
		this.changePhase(game.status.currentPhase);
};

PhaseObject.prototype.changePhase = function ( phase ){
	if(phase == this.phase)
		return false;
	for(var i in this.phaseOptions[phase]){
		this[i] = this.phaseOptions[phase][i];
	};
	this.phase = phase;
};