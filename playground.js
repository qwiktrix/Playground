var canvas, canvasContext, h, w;


var cursor, inBounds = false;
var offset = 12;
var img = new Image();
img.src = 'playground/images/cursor.png';

var framesPerSecond = 30;
var ammo;

var ammoSet = [];
var explosionSet = [];
var explosion;

function calcMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var mouseX = evt.clientX - rect.left;
    var mouseY = evt.clientY - rect.top;

    return {
        x: mouseX,
        y: mouseY
    };
}

window.onload = function() {
    canvas = document.getElementById('playground-canvas'), h = canvas.height, w = canvas.width;
    canvasContext = canvas.getContext('2d');

    setInterval(function() {
        update();
    }, 1000/framesPerSecond);

    var firesPerSecond = 2;
    setInterval( function() {
        ammo = new ammoClass();
        ammoSet.push(ammo);
    }, 1000/firesPerSecond);

    canvas.addEventListener('click', function() {
        ammoSet.forEach(function(elem) {
            if (elem.isCursor()){
                elem.onClick();
                explosion = new explosionClass(null, cursor.x, cursor.y);
                explosionSet.push(explosion);
                explosionSet[explosionSet.length - 1].add();
            }
        });
    }); 

    canvas.addEventListener('mousemove', 
        function(evt) {
            var mousePos = calcMousePos(evt);
            cursor = {
                x: mousePos.x,
                y: mousePos.y
            } ;
            inBounds = true;
    });

    canvas.addEventListener('mouseout', function() {
        inBounds = false;
    });
}

function update() {
    drawEverything();
    moveEverything();
}

function moveEverything() {
    for (var i = ammoSet.length - 1; i > 0; i--) {
        if (!ammoSet[i].exists) { ammoSet.splice(i,1);}
    }

    for (var i = explosionSet.length - 1; i > 0; i--) {
        if (explosionSet[i].isEmpty()) {explosionSet.splice(i,1)}
    }

    explosionSet.forEach(function(elem) {elem.moveParticles();})

    ammoSet.forEach(function(elem) {
        elem.move();
        elem.fall();
    });
}

function drawEverything() {
    canvasContext.clearRect(0, 0, 1000, 500);
    ammoSet.forEach(function(elem) { elem.draw();});
    explosionSet.forEach(function(elem) {elem.drawParticles();})

    if (inBounds) {
        drawCursor(img, cursor.x, cursor.y);
    }
}

function drawCircle(posX, posY, radius, colour) {
    canvasContext.fillStyle = colour;
    canvasContext.beginPath();
    canvasContext.arc(posX, posY, radius, 0, 2 * Math.PI, true);
    canvasContext.fill();
}

function drawCursor(image, leftX, topY) {
    canvasContext.drawImage(image, leftX - offset, topY - offset);
}