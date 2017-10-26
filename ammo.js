function ammoClass() {
	this.radius = 8.5;
	this.widthRange = this.radius + Math.random() * (w - this.radius);
	this.startHeight = h;
	this.startVelY = -1 * Math.floor((Math.random() * (15 - 12) + 12));
	this.colour = '#A5435C';

	particleClass.call(this, this.widthRange, this.startHeight, 0, this.startVelY, this.radius, this.colour);
}

ammoClass.prototype = Object.create(particleClass.prototype); 
ammoClass.prototype.constructor = ammoClass;

ammoClass.prototype.onClick = function() {
	if (this.isCursor()) {
		this.exists = false;
	}
}

ammoClass.prototype.fall = function() {
	if (this.y > h) {
		this.exists = false;
	}
}
