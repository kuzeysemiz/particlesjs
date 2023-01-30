var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
var ctx = canvas.getContext('2d');
canvas.height = innerHeight;
var circle = new Circle();
var circles = [];
var dx = 1.5;
var dy = 1.5;
var CIRCLE_SIZE,CIRCLE_X,CIRCLE_Y,mouseX,mouseY;
mouseX=0;
mouseY = 0;
onLoad();
function onLoad(){
    for(var i = 0 ; i < 100; i++){
        var circle = new Circle(Math.random()*canvas.width,Math.random()*canvas.height,10);
        circles.push(circle);
        ctx.fillStyle = "Black"
        ctx.fill();
        circle.draw();
    }
}
var clicking;
document.addEventListener("mousemove",function(e){
    mouseX = e.x;
    mouseY = e.y;
})
document.addEventListener("mousedown",function(e){
    clicking = true;
})
document.addEventListener("mouseup",function(e){
    clicking = false;
})
function rondomSayi(max){
    return parseInt(Math.random()*max);
}
function Circle(CIRCLE_X,CIRCLE_Y,CIRCLE_SIZE){
    this.CIRCLE_SIZE = CIRCLE_SIZE;
    this.CIRCLE_X = CIRCLE_X;
    this.CIRCLE_Y = CIRCLE_Y;
    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.CIRCLE_X,this.CIRCLE_Y,this.CIRCLE_SIZE,0,Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
    }
    this.chords ={
        
        x: (Math.random()*3 + 2)+(Math.random()*-3 -2),//rondomSayi(2) ? -1:1,
        y: (Math.random()*3 + 2)+(Math.random()*-3 - 2)//rondomSayi(2) ? -1:1
    };
}
function kareal(sayi){
    return Math.pow(sayi,2);
}
var hiz = 3;
var mousePointer = new Circle(mouseX,mouseY,10);
function loop(){
    requestAnimationFrame(loop);
    mousePointer.CIRCLE_X = mouseX;
    mousePointer.CIRCLE_Y = mouseY;
    mousePointer.draw();
    ctx.fillStyle = "white"
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    ctx.arc(mouseX,mouseY,10,0,Math.PI*2);
    ctx.stroke();
    var opacityValue = 1;
    for(var a = 0; a < circles.length; a++){
        for(var b= 0; b< circles.length; b++){
            ctx.beginPath();
            ctx.moveTo(circles[a].CIRCLE_X,circles[a].CIRCLE_Y);
            var otherDistance = Math.sqrt(kareal(circles[b].CIRCLE_X-circles[a].CIRCLE_X) + kareal(circles[b].CIRCLE_Y-circles[a].CIRCLE_Y));
            var mouseDistance = Math.sqrt(kareal(circles[b].CIRCLE_X-mouseX) + kareal(circles[b].CIRCLE_Y-mouseY));
            if(mouseDistance < 300 && clicking){
                
                if(circles[b].chords.x > 0 && mouseX >circles[b].CIRCLE_X || circles[b].chords.x < 0 && mouseX < circles[b].CIRCLE_X){
                    circles[b].chords.x *= -1;
                }
                if(circles[b].chords.y > 0 && mouseY >circles[b].CIRCLE_Y || circles[b].chords.y < 0 && mouseY < circles[b].CIRCLE_Y){
                    circles[b].chords.y *= -1;
                }

                circles[b].CIRCLE_X += circles[b].chords.x * hiz/9;
                circles[b].CIRCLE_Y += circles[b].chords.y * hiz/9;
            }
            if(mouseDistance < 200){
                ctx.lineTo(mouseX,mouseY);
            }
            if(otherDistance < 260){
                ctx.lineTo(circles[b].CIRCLE_X,circles[b].CIRCLE_Y);
                ctx.strokeStyle = "black"
                ctx.stroke();
            }
        }
    }
    for(var i = 0; i< circles.length;i++){
        if(circles[i].CIRCLE_X < canvas.width && circles[i].CIRCLE_X > 0 && circles[i].CIRCLE_Y < canvas.height && circles[i].CIRCLE_Y > 0){
            circles[i].CIRCLE_X += circles[i].chords.x * hiz/10;
            circles[i].CIRCLE_Y += circles[i].chords.y * hiz/10;
            circles[i].draw();
        }
        else
        {
            circles.splice(i,1);
            circles.push(new Circle(Math.random()*canvas.width,Math.random()*canvas.height,10));
        }
    }
}

loop();