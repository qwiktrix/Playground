function explosionClass(particles, pointX, pointY) {
	this.set = [];
	this.spawnX = pointX || 500;
	this.spawnY = pointY || 100;
	this.particlesNum = particles || 100;

	// particle inputs
	this.radius = 10; 
	this.colour = '#A5435C'; 
}

explosionClass.prototype = {
	// add particle
	add: function() {
		var tmpParticle;
		for (var i = 0; i < this.particlesNum; i++) {
			tmpParticle = new particleClass(this.spawnX, this.spawnY, 7.5 - Math.random()*15, 7.5 - Math.random()*15, this.radius, this.colour);
			tmpParticle.lifespan = 30 + Math.floor( Math.random() * 100 );
			tmpParticle.hasLife = true;
			this.set.push(tmpParticle);
		}
	},

	// move particles
	moveParticles: function() {
		// basic move/gravity
  		for (var i = 0; i < this.set.length; i++) {
  			this.set[i].move();
  		}
  		// delete from list when exist is false
		for (var i = this.set.length -1; i >= 0; i--) {
        	if (!this.set[i].exists) { this.set.splice(i,1);}
    	}
	},

	// draw particles
	drawParticles: function() {
		for (var i = 0; i < this.set.length; i++) {
			this.set[i].draw();
		}
	},

	// check for empty particles
	isEmpty: function() {
		if (this.set.length == 0) {
			return true;
		} else {
			return false;
		}
	}
}