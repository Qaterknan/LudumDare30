function LevelLayout( options ){
	this.objects = [];
	var _this = this;
	var options = options === undefined ? {} : options;
	
	this.levelWidth = options.levelWidth === undefined ? 1000 : options.levelWidth;
	
	if(options.streetTexture === undefined)
		this.streetTexture = {
			World : new Texture(game.loader.get("street"), {
				repeat : true,
				width : _this.levelWidth+2/3*game.canvas.width, 
				height : 100, 
				scale : new Vec2(5,5),
			}),
			Void : new Texture(game.loader.get("streetVoid"), {
				repeat : true,
				width : _this.levelWidth+2/3*game.canvas.width,
				height : 100,
				scale : new Vec2(5,5),
				animations : {
					being : {
						start : 0,
						end : 2,
						delay : 150,
					},
				},
				totalFrames : 3,
				currentAnimation : "being",
			}),
		};
	else
		this.streetTexture = options.streetTexture;
	
	if(options.wallTexture === undefined){
		this.wallTexture = { 
			World : new Texture(game.loader.get("wall"), {
				scale : new Vec2(3,3),
			}),
			Void : new Texture(game.loader.get("wallVoid"), {
				scale : new Vec2(3,3),
				animations : {
					standing : {
						start : 0,
						end : 3,
						delay : 150,
					},
				},
				totalFrames : 4,
				currentAnimation : "standing",
			}),
		};
	}
	else
		this.wallTexture = options.wallTexture;
	
	
	if(options.backgroundTexture === undefined)
		this.backgroundTexture = {
			World : new Texture(game.loader.get("house"), {
				repeat : true,
				width : _this.levelWidth,
				height : 490,
				scale : new Vec2(10,10),
			}),
			Void : new Texture(game.loader.get("houseVoid"), {
				repeat : true,
				width : _this.levelWidth,
				height : _this.levelHeight,
				height : 490,
				scale : new Vec2(10,10),
				animations : {
					standing : {
						start : 0,
						end : 2,
						delay : 150,
					},
				},
				totalFrames : 3,
				currentAnimation : "standing",
			}),
		};
	else
		this.backgroundTexture = options.backgroundTexture;
		
	if(options.skyTexture === undefined){
		this.skyTexture = {
			World : new Texture(game.loader.get("sky"), {
				width : game.canvas.width,
				height : game.canvas.height,
				repeat : true,
			}),
			Void : new Texture(game.loader.get("skyVoid"), {
				width : game.canvas.width,
				height : game.canvas.height,
				animations : {
					being : {
						start : 0,
						end : 2,
						delay : 150,
					},
				},
				totalFrames : 3,
				currentAnimation : "being",
				repeat : true,
			}),
		};
		
	}
	else
		this.skyTexture = options.skyTexture;
	
	this.sky = new PhaseObject({
		worldOptions : {
			texture : _this.skyTexture.World,
		},
		voidOptions : {
			texture : _this.skyTexture.Void,
		},
		fixed : true,
	});
	this.objects.push(this.sky);
	
	this.street = new PhaseObject({
		position : new Vec2(0,200),
		width : _this.levelWidth,
		height : 100,
		colliding : true,
		id : "street",
		worldOptions : {
			texture : _this.streetTexture.World,
		},
		voidOptions : {
			texture : _this.streetTexture.Void,
		},
	});
	
	this.background = new PhaseObject({
		width : _this.levelWidth,
		height : _this.backgroundTexture.World.height,
		position : new Vec2(0,_this.street.position.y-(_this.street.height+_this.backgroundTexture.World.height)/2),
		worldOptions : {
			texture : _this.backgroundTexture.World,
		},
		voidOptions : {
			texture : _this.backgroundTexture.Void,
		},
	});
	this.objects.push(this.background);
	
	this.wallRight = new PhaseObject({
		position : new Vec2(_this.levelWidth/2+37.5, 0),
		width : 75,
		height : 300,
		colliding : true,
		id : "wall",
		worldOptions : {
			texture : _this.wallTexture.World,
		},
		voidOptions : {
			texture : _this.wallTexture.Void,
		},
	});
	this.wallLeft = new PhaseObject({
		position : new Vec2(-_this.levelWidth/2-37.5, 0),
		width : 75,
		height : 300,
		colliding : true,
		id : "wall",
		worldOptions : {
			texture : _this.wallTexture.World,
		},
		voidOptions : {
			texture : _this.wallTexture.Void,
		},
	});
	this.objects.push(this.wallRight, this.wallLeft);
	
	this.objects.push(this.street);
};

LevelLayout.prototype.addObjectsTo = function (world){
	for(var i in this.objects){
		world.add(this.objects[i]);
	};
};