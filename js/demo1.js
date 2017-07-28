var canvas = document.getElementById("demo1-canvas");
var ctx = canvas.getContext("2d");
var canvasPosition;

canvas.width = window.innerWidth-95;
canvas.height = 600;

canvas.style.border = "5pt solid Indianred";

function getPosition(element){
    var xPos = 0;
    var yPos = 0;

    while (element) {
        if (element.tagName == "BODY") {
            // deal with browser quirks with body/window/document and page scroll
            var xScroll = element.scrollLeft || document.documentElement.scrollLeft;
            var yScroll = element.scrollTop || document.documentElement.scrollTop;

            xPos += (element.offsetLeft - xScroll + element.clientLeft);
            yPos += (element.offsetTop - yScroll + element.clientTop);
        } else {
            // for all other non-BODY elements
            xPos += (element.offsetLeft - element.scrollLeft + element.clientLeft);
            yPos += (element.offsetTop - element.scrollTop + element.clientTop);
        }

        element = element.offsetParent;
    }
    return {
        x: xPos,
        y: yPos
    };
}

function updatePosition(){
    canvasPosition = getPosition(canvas);
}

var mouse = {
    dx:0,
    dy:0,
    down:false
}

var running = false;
var interval;

function init(){
    ctx.fillStyle = "Mediumseagreen";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}init();

function renderAll(){
    if (mouse.down){
        ctx.clearRect(mouse.dx - canvasPosition.x,mouse.dy - canvasPosition.y,50,50);
    }
    canvasPosition = getPosition(canvas);
}

function start(){
    if(running === false){
        interval = window.setInterval(renderAll,1000/60);
        running = true;
        console.log("started");
    }
}

function stop(){
    if(running){
        window.clearInterval(interval);
        running = false;
        console.log("stopped");
    }
}

// EVENT listeners
canvas.addEventListener("mousedown",function (e) {
    e.preventDefault();
    mouse.down = true;
});
canvas.addEventListener("mouseup",function (e) {
    e.preventDefault();
    mouse.down = false;
});
canvas.addEventListener("mousemove",function (e){
    mouse.dx = e.clientX;
    mouse.dy = e.clientY;
});
canvas.addEventListener("mouseenter",function(e){
    start();
});
canvas.addEventListener("mouseleave",function(e){
    stop();
});
document.addEventListener("scroll", updatePosition,false);
document.addEventListener("resize", updatePosition,false);
