// particle class
function particleClass(centerX, centerY, velocityX, velocityY, radius, colour) {
    this.x = centerX;       
    this.y = centerY;       
    this.velX = velocityX;      // particle X-coord velocity vector
    this.velY = velocityY;      // particle Y coord velocity vector
    this.exists = true;         // flag for particle exist (use for removal)
    this.lifespan = 100;        // life coeff of particle, relates to draw radius
    this.hasLife = false;       // flag for shrinking lifespan
    this.hasGravity = true;     // flag if affected by gravity
    this.radius = radius || 5;
    this.colour = colour || 'black';
}
particleClass.prototype = {
    gravityCoef: 0.25,
    lifespanCoef: 125,     // radius lifespan divisor coefficient
    hitTolerance: 15,

    // move method
    move: function() {
        if (this.hasLife) {
            if (this.exists) {
                 this.lifespan--;
            }
            if (this.lifespan == 0) {this.exists = false;}
        }
        if (this.hasGravity) { this.velY += this.gravityCoef;}   // gravity is optional
        this.x += this.velX;
        this.y += this.velY;
    },
    // draw method
    draw: function() {
        if (this.hasLife) {
            drawCircle(this.x, this.y, this.radius * this.lifespan / this.lifespanCoef, this.colour) // draw with shrinking radius
        } else {
            drawCircle(this.x, this.y, this.radius, this.colour);                   // draw with consistent radius
        }
    },
    // difference between point and particle center
    delta: function(point) {
        var diff = {
            dx: point.x - this.x, 
            dy: point.y - this.y,
        };
        var delta = {
            x: diff.dx,
            y: diff.dy,
            vec: Math.sqrt(Math.pow(diff.dx, 2) + Math.pow(diff.dy, 2))
        };
        return delta;
    },
    // cursor collision method
    isCursor: function() {
        var distance = this.delta(cursor);
        if (distance.vec < this.radius + this.hitTolerance) {
            return true;
        } else {
            return false;
        }
    }
}
