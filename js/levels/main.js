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
		
		var p = game.player = new Player({
			width : 60,
			height : 140,
			gravity : new Vec2(0,600),
		});
		
		d = new Demon({
			width : 156,
			height : 135,
			gravity : new Vec2(0,600),
			texture : new Texture(game.loader.get("demon"),{
				scale : new Vec2(3,3),
				animations : {
					standing : {
						start : 0,
						end : 1,
						delay : 300,
					},
				},
				totalFrames : 2,
				currentAnimation : "standing",
			}),
		});
		
		LL = new LevelLayout({
			backgroundTexture : {
				World : new Texture(game.loader.get("farm"), {
					width : 1000,
					height : 200,
					scale : new Vec2(4,4),
					repeat : true,
				}),
			},
			/*skyTexture : {
				World : new Texture(game.loader.get("hall"), {
					width : game.canvas.width+2/3*game.canvas.width,
					height : game.canvas.height,
					repeat : true,
					scale : new Vec2(3,game.canvas.height/100),
				}),
			},*/
		});
		LL.addObjectsTo(game.world);
		game.world.add(game.player);
		game.world.add(d);
		game.world.addKeyboardControl("D",function(){
			if(p.texture.scale.x < 0)
				p.texture.scale.x *= -1;
			p.velocity.x = 300;
			p.running = true;
			if(p.position.x-game.world.camera.position.x > game.canvas.width/5)
				game.world.camera.velocity.x = 300;
			else
				game.world.camera.velocity.x = 0;
		}, function (){
			p.velocity.x = 0;
			p.running = false;
			game.world.camera.velocity.x = 0;
		});
		game.world.addKeyboardControl("A",function(){
			if(p.texture.scale.x > 0)
				p.texture.scale.x *= -1;
			p.velocity.x = -300;
			p.running = true;
			if(p.position.x-game.world.camera.position.x < -game.canvas.width/5)
				game.world.camera.velocity.x = -300;
			else
				game.world.camera.velocity.x = 0;
		}, function (){
			p.velocity.x = 0;
			p.running = false;
			game.world.camera.velocity.x = 0;
		});
		game.world.addKeyboardControl(" ",function(){
			if(!p.jumping){
				p.velocity.y -= 500;
				p.jumping = true;
			}
		});
		game.world.addKeyboardControl("S",function(){
			p.fighting = true;
		}, function (){p.fighting = false;});
		
		game.world.addKeyboardControl("P",undefined,function(){
			game.status.switchPhase();
		});
		
		game.status = new Status();
	},
}