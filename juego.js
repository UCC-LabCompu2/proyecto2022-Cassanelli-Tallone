function setHalfVolume() {
    var myAudio = document.getElementById("audio1");
    myAudio.volume = 0.1;
  }

  const canvas = document.getElementById("canvasSnake");
  const ctx = canvas.getContext("2d");

  class parteSnake{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
  }


 let velocidad=10;
 
 let casillas=20;
 let tamanoCasillas= canvas.width/casillas -2;
 let cabezaX=10;
 let cabezaY=10;
 const partesSnake = [];
 let longitud = 2;

 let mzaX = 5;
 let mzaY = 5;

 let velocidadX=0;
 let velocidadY=0;

 let score = 0;

 function juego(){
    
    cambioPosicion();

    let resultado = GameOver();
    if(resultado){
        return;
    }


    limpiar();
    
    colisionMza();
    dibujarMza();
    dibujarSnake();
    dibujarScore();
    setTimeout(juego, 1000/velocidad)
 }

 function GameOver(){
    gameOver = false;

    if(cabezaX<0){
        gameOver = true;
    }

    return gameOver;
 }

 function dibujarScore(){
    ctx.fillStyle="white";
    ctx.font= "10px Verdana";
    ctx.fillText("Score " + score, canvas.width-50, 10);

 }

 function limpiar(){
    ctx.fillStyle='green';
    ctx.fillRect(0,0,canvas.width,canvas.height);
 }

function dibujarSnake(){
    
    ctx.fillStyle='violet';
    for(let i=0; i<partesSnake.length; i++){
        let parte = partesSnake[i];
        ctx.fillRect(parte.x * casillas, parte.y * casillas, tamanoCasillas, tamanoCasillas)
    }

    partesSnake.push(new parteSnake(cabezaX, cabezaY));
    if(partesSnake.length > longitud){
        partesSnake.shift();
    }

    ctx.fillStyle='purple'
    ctx.fillRect(cabezaX * casillas, cabezaY * casillas, tamanoCasillas, tamanoCasillas)

}

function cambioPosicion(){
    cabezaX = cabezaX + velocidadX;
    cabezaY = cabezaY + velocidadY;
}

function dibujarMza(){
    ctx.fillStyle="red";
    ctx.fillRect(mzaX*casillas, mzaY*casillas, tamanoCasillas, tamanoCasillas)
}

function colisionMza(){
    if(mzaX === cabezaX && mzaY == cabezaY){
        mzaX = Math.floor(Math.random() * casillas)
        mzaY = Math.floor(Math.random() * casillas)
        longitud++;
        score++;
    }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    //Arriba
    if(event.keyCode == 38){
        if(velocidadY==1)
            return;
        velocidadY = -1;
        velocidadX = 0;
    }

    //Abajo
    if(event.keyCode == 40){
        if(velocidadY==-1)
            return;
        velocidadY = 1;
        velocidadX = 0;
    }

    //Izquierda
    if(event.keyCode == 37){
        if(velocidadX==1)
            return;
        velocidadY = 0;
        velocidadX = -1;
    }

    //Derecha
    if(event.keyCode == 39){
        if(velocidadX==-1)
            return;
        velocidadY = 0;
        velocidadX = 1;
    }

}

juego();
