function Status( options ){
	this.levelsDone = [];
	this.currentPhase = "World";
};
Status.prototype.switchPhase = function (){
	if(this.currentPhase == "World")
		this.currentPhase = "Void";
	else this.currentPhase = "World";
	return this.currentPhase;
};