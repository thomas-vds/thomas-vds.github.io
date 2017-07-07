var canvas = document.getElementById("demo1-canvas");
var ctx = canvas.getContext("2d");

var startButton = document.getElementById("demo1-start-button");
var stopButton = document.getElementById("demo1-stop-button");
var resetButton = document.getElementById("demo1-reset-button");

canvas.width = window.innerWidth-95;
canvas.height = 600;

canvas.style.border = "5pt solid Indianred";
canvas.style.padding = "2em";

function Circle(x,y,vx,vy){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.w = 50;
    this.h = 50;
    this.color = "blue";
    this.draw = function(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.arc(this.x,this.y,this.w,0,2*Math.PI);
        ctx.fill();
    }
    this.update = function(){
        this.x += this.vx;
        this.y += this.vy;

        // Collision
        if(this.x - this.w < 0){
            this.vx *= -1;
        }
        if(this.x + this.w > canvas.width){
            this.vx *= -1;
        }
        if(this.y - this.w < 0){
            this.vy *= -1;
        }
        if(this.y + this.h > canvas.height){
            this.vy *= -1;
        }
    }
}

var running = false;
var interval;
var renderstack = [];

// create circles
function createCircles(amount){
    var randomX, randomY,randomVX,randomVY;
    for(var i=0;i<amount;i++){
        randomX = Math.round(Math.random()* (canvas.width - 100)) + 50;
        randomY = Math.round(Math.random()* (canvas.height - 100)) + 50;
        randomVX = Math.round(Math.random()*4)-2;
        randomVY = Math.round(Math.random()*4)-2;
        // objects added to this array are rendered on screen
        renderstack.push(new Circle(randomX,randomY,randomVX,randomVY));
    }
}

function init(){
    createCircles(10);
}init();

function drawAll(){
    renderstack.forEach(function(e){e.draw()});
}
function updateAll(){
    renderstack.forEach(function (e) {e.update()});
}

function start(){
    if(running === false){
        interval = window.setInterval(renderAll,1000/30);
        running = true;
    }
}
function stop(){
    if(running){
        window.clearInterval(interval);
        running = false;
    }
}

function reset(){
    stop();
    renderstack = [];
    ctx.clearRect(0,0,canvas.width,canvas.height);
    createCircles(10);
}

function renderAll(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawAll();
    updateAll();
}

// EVENT listeners
startButton.addEventListener("mouseup",function (e) {
    start();
});
stopButton.addEventListener("mouseup",function (e) {
   stop();
});
resetButton.addEventListener("mouseup",function (e) {
   reset();
});