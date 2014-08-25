{
	assets : {
		"_hero" : "./assets/hrdina_standing.png",
		"hero" : "./assets/hero.png",
		"heroVoid" : "./assets/heroVoid.png",
		"sky" : "./assets/obloha.png",
		"skyVoid" : "./assets/oblohaVoid.png",
		"street" : "./assets/pozadi_ulice.png",
		"streetVoid" : "./assets/pozadi_uliceVoid.png",
		"house" : "./assets/dum.png",
		"houseVoid" : "./assets/dumVoid.png",
		"wall" : "./assets/zed.png",
		"wallVoid" : "./assets/zedVoid.png",
		"farm" : "./assets/farma.png",
		"hall" : "./assets/sin.png",
		"demon" : "./assets/demon_anim.png",
	},
	preload : function (game){
		
	},
	afterload : function (game){
		
		var LL = new LevelLayout({
			levelWidth : 5000,
			backgroundTexture : {
				World : new Texture(game.loader.get("farm"),{
					repeat : true,
					width : 5000,
					height : 200,
					scale : new Vec2(4,4),
				}),
			},
		});
		LL.addObjectsTo(game.world);
		
		var nadpis = new GUIText({
			text : "The Night Of Daemons",
			width : 340,
			height : 50,
			font : "LudumFont",
			size : 70,
			fixed : true,
			color : "white",
			position : new Vec2(0,-200),
		});
		game.world.add(nadpis);
		
		var playButton = new GUILabel({
			width : 73,
			height : 30,
			position : new Vec2(-200,-100),
			fixed : true,
			visible : false,
			onclick : function (){
				game.world.camera = new Camera();
				game.levelLoad("./js/levels/main.js", function (){console.log("loaded")});
			},
		});
		
		var playText = new GUIText({
			text : "Fight!",
			width : 73,
			height : 30,
			font : "LudumFont",
			size : 50,
			color : "white",
			position : new Vec2(0,-25),
			debug : false,
		});
		playButton.add(playText);
		
		game.world.add(playButton);
		
		game.status = new Status();
		
		game.world.camera.velocity.x = 20;
		var hTick = game.world.camera.tick;
		var nTick =function (dt){
			hTick.call(game.world.camera, dt);
			if(game.world.camera.position.x > 200 && game.status.currentPhase == "World" && game.world.camera.position.x < 400){
				game.status.switchPhase();
			}
			if(game.world.camera.position.x > 400 && game.status.currentPhase == "Void"){
				game.status.switchPhase();
			}
			if(game.world.camera.position.x > 2000){
				game.world.camera.position.x = 0;
			}
		};
		game.world.camera.tick = nTick;
	},
}