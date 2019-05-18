window.onload = function() {

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");


var bg = document.getElementById("bg");
var fg = document.getElementById("fg");
var pipeNorth = document.getElementById("pN");
var pipeSouth = document.getElementById("pS");
var bird = document.getElementById("bird");


var gap = 100;
var constant = pipeNorth.height+gap;

var birdX = 10;
var birdY = 150;

var gravity = 1.5;

var score = 0;

var flying = new Audio();
var scored = new Audio();

flying.src = "sounds/fly.mp3";
scored.src = "sounds/score.mp3";


document.addEventListener("keydown", moveUp);

function moveUp() {
    if(birdY > 25) {
        birdY -= 25;
    }
    flying.play();
}

var pipe = [];
pipe[0] = {
    x : cvs.width,
    y : 0
}
function draw() {

    ctx.drawImage(bg, 0,0);

    for(var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
        pipe[i].x--;

        if(pipe[i].x == 125) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        if(birdX + bird.width >= pipe[i].x && birdX <= pipe[i].x + pipeNorth.width
            && (birdY <= pipe[i].y  + pipeNorth.height || birdY+bird.height >= 
                pipe[i].y+constant) || birdY + bird.height >= cvs.height - fg.height) {
                location.reload();
        }

        if(pipe[i].x == 5) {
            score++;
            scored.play();
        }
    }

    ctx.drawImage(fg,0, cvs.height - fg.height);

    ctx.drawImage(bird, birdX, birdY);

    birdY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score,10,cvs.height-20);

    requestAnimationFrame(draw);
}

draw();
}


