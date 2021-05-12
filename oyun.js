var cvs=document.getElementById("canvas");
var scoreyeri=document.getElementById("score");
var ctx=cvs.getContext("2d");

var chop =new Image();
var bg =new Image();
var bullet =new Image();
var enemy =new Image();
var cloud =new Image();
var backgroundsound= new Audio();
var choppersound= new Audio();

chop.src="images/chop.png";
bg.src="images/bg.png";
bullet.src="images/bullet.png";
enemy.src="images/enemy.png";
cloud.src="images/cloud.png";

backgroundsound.src="sounds/background.flac";
backgroundsound.play();
backgroundsound.volume=0.01;
backgroundsound.loop=true;

choppersound.src="sounds/chopper.mp3";
choppersound.play();
choppersound.volume=0.05;
choppersound.loop=true;

var gravity=0;

var crandom1=Math.floor(Math.random()*2000);

var crandom2=Math.floor(Math.random()*2000);

var crandom3=Math.floor(Math.random()*2000);

var chup=false;
var chdwn=false;

var chopoptions ={
    x:25,
    y:200,
}

class cloudoptions{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    draw(){
        ctx.drawImage(cloud,this.x,this.y)
    }
    move(){
        this.draw();
        this.x-=1;
    }
    
}

class missile{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    yokolma(){
        if(this.x>cvs.clientHeight)
        return true;
        return false;
    }
    move(){
        this.x+=5;
    }
}

var clouds=[]

var enemies=[]

enemies[0]={
    x:cvs.width-enemy.width,
    y:Math.floor(Math.random() * 400+enemy.height )
}

enemies[1]={
    x:cvs.width-enemy.width,
    y:Math.floor(Math.random() * 400+enemy.height )
}

function chopup()
    {
        if (chopoptions.y>0)
        chopoptions.y-=7;
        else{
        chopoptions.y=0; 
        }
    }

 function chopdown()
    {
        if (chopoptions.y+chop.height<cvs.width)
        chopoptions.y+=7;
        else{
        chopoptions.y=cvs.height-chop.height;
        }
    }

addEventListener("keypress",function (e){
    if(e.key==="w"){
        chup=true;
    }
    if(e.key==="s"){
        chdwn=true;
    }
    if(e.key===" "){
        if(missiles.length<3)
        {
            missiles.push(new missile(chopoptions.x,chopoptions.y));
            var missilesounds=new Audio();
            missilesounds.src="sounds/missile.wav";
            missilesounds.volume=0.03;
            missilesounds.play();
        }
    }
})
    
var missiles=[]

var score=0

addEventListener("keyup",function (e){
    if(e.key==="w"){
        chup=false;
    }
     if(e.key==="s"){
        chdwn=false;
    }
})  

function spawnClouds() {
    setInterval(function() {
        clouds.push(new cloudoptions(cvs.width+64,Math.random()*cvs.height))
    },1000)
}

function draw()
{
    ctx.drawImage(bg,0,0);
    if (chup)
        chopup();
    if (chdwn)
        chopdown();

    clouds.forEach(function(cloud){
        if(cloud){
            cloud.move()
        }
    })    

    ctx.drawImage(chop,chopoptions.x,chopoptions.y);
    missiles.forEach(function(fuze){
            fuze.move();

            if(fuze.yokolma()){
            var roket=missiles.indexOf(fuze);
            missiles.splice(roket,1);
            }
            ctx.drawImage(bullet,fuze.x,fuze.y)
    })
    for(var i = 0;i<enemies.length;i++){
        if(enemies[i].x && enemies[i].y){
        enemies[i].x-=1.5;

        if(enemies[i].x<=chopoptions.x+64 && (enemies[i].y>=chopoptions.y && enemies[i].y<=chopoptions.y+chop.height)){
        location.reload();
        }

        if(enemies[i].x<=0){
        enemies.splice(0,2)
        enemies.push({x:cvs.width-enemy.width, y:Math.floor(Math.random() * 400+enemy.height )})
        enemies.push({x:cvs.width-enemy.width, y:Math.floor(Math.random() * 400+enemy.height )})
        }
        ctx.drawImage(enemy,enemies[i].x ,enemies[i].y)
    }
}
if(enemies.length<2) enemies.push({x:cvs.width-enemy.width, y:Math.floor(Math.random() * 400+enemy.height )});

    if (chopoptions.y+64>=cvs.height){
    location.reload();
    }
   
    chopoptions.y+=gravity;
    
    for(var i=0; i<missiles.length; i++){
        for(var j=0; j<enemies.length; j++){
            if(Math.abs(missiles[i].x-enemies[j].x)<50)
                if(Math.abs(missiles[i].y-enemies[j].y)<50){
                missiles.splice(i, 1);
                enemies.splice(j, 1);
                score++;
                scoreyeri.innerHTML="score: "+score;
            }
        }
    }

    requestAnimationFrame(draw);

}

draw();

spawnClouds();