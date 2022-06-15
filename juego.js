// Audio de Fondo
function setHalfVolume() {
  var myAudio = document.getElementById("audio1");
  myAudio.volume = 0.1;
}

// Se llaman a los elementos creados en HTML
const canvas = document.getElementById("canvasSnake");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const maxScoreDisplay = document.getElementById("maxScore");
const maxScoreGuardado = localStorage.getItem("maxScore");
const maxUsuarioDisplay = document.getElementById("maxUsuario");

// Cuando el Maximo Puntaje se carga, se guarda localmente
if (maxScoreGuardado) {
  maxScoreDisplay.innerHTML = maxScoreGuardado;

  const maxUsuarioGuardado = localStorage.getItem("maxUsuario");
  maxUsuarioDisplay.style.display = "block";
  maxUsuarioDisplay.innerHTML = maxUsuarioGuardado;
}

class parteSnake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// Valores por defecto. Usados para reiniciar al estado inicial para volver a jugar
const CABEZA_X = 10;
const CABEZA_Y = 10;
const MANZANA_X = 5;
const MANZANA_Y = 5;
const LONGITUD = 2;

// Se inicializan variables
const velocidad = 10;
let casillas = 20;
const tamano = canvas.width / casillas;
const tamanoCasillas = tamano - 1;
let cabezaX = CABEZA_X;
let cabezaY = CABEZA_Y;
let partesSnake = [];
let longitud = LONGITUD;
let mzaX = MANZANA_X;
let mzaY = MANZANA_Y;
let velocidadX = 0;
let velocidadY = 0;
let score = 0;
let usuario = "";
const botonPlay = document.getElementById("botonPlay");

// Funcion principal para el funcionamiento del juego
function juego() {
  cambioPosicion();

  const gameOver = GameOver();
  if (gameOver) {
    const maxScore = Number(maxScoreDisplay.innerHTML);
    if (score > maxScore) {
      localStorage.setItem("maxScore", score);
      localStorage.setItem("maxUsuario", usuario);
      maxScoreDisplay.innerHTML = score;
      maxUsuarioDisplay.style.display = "block";
      maxUsuarioDisplay.innerHTML = usuario;
      usuario = "";
    }
    return;
  }

  limpiar();
  colisionMza();
  dibujarMza();
  dibujarSnake();
  dibujarScore();
  setTimeout(juego, 1000 / velocidad);
}

// Funcion de colision, para saber cuando se pierde
function GameOver() {
  let gameOver = false;

  if (velocidadX === 0 && velocidadY === 0) {
    return false;
  }

  if (cabezaX < 0) {
    gameOver = true;
  }
  if (cabezaX >= casillas) {
    gameOver = true;
  }
  if (cabezaY < 0) {
    gameOver = true;
  }
  if (cabezaY >= casillas) {
    gameOver = true;
  }
  for (let i = 0; i < partesSnake.length; i++) {
    let parte = partesSnake[i];
    if (parte.x === cabezaX && parte.y === cabezaY) {
      gameOver = true;
      break;
    }
  }
  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px VT323";
    ctx.fillText("PERDISTE... :(", canvas.width / 4, canvas.height / 2);
  }
  return gameOver;
}

// Reinicia las variables para volver al estado inicial del juego
function volverAJugar() {
  longitud = LONGITUD;
  partesSnake = [];
  velocidadX = 0;
  velocidadY = 0;
  cabezaX = CABEZA_X;
  cabezaY = CABEZA_Y;
  mzaX = MANZANA_X;
  mzaY = MANZANA_Y;
  score = 0;
  dibujarMza();
  dibujarSnake();
  juego();
}

// Cambia el Score
function dibujarScore() {
  ctx.fillStyle = "white";
  ctx.font = "10px Verdana";
  scoreDisplay.innerHTML = score;
}

// Limpia el trazo de la viborita tapado del mismo color que el canvas
function limpiar() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Dibuja la viborita del tamaño inicializado ya sea la cabeza, cuerpo o posible creacion de una parte
function dibujarSnake() {
  ctx.fillStyle = "violet";
  for (let i = 0; i < partesSnake.length; i++) {
    let parte = partesSnake[i];
    ctx.fillRect(
      parte.x * tamano,
      parte.y * tamano,
      tamanoCasillas,
      tamanoCasillas
    );
  }

  partesSnake.push(new parteSnake(cabezaX, cabezaY));
  if (partesSnake.length > longitud) {
    partesSnake.shift();
  }

  ctx.fillStyle = "purple";
  ctx.fillRect(
    cabezaX * tamano,
    cabezaY * tamano,
    tamanoCasillas,
    tamanoCasillas
  );
}

// Cambio de posicion en la grilla, suma de a 1 que significa el cambio de casilla
function cambioPosicion() {
  cabezaX = cabezaX + velocidadX;
  cabezaY = cabezaY + velocidadY;
}

// Dibuja Manzana
function dibujarMza() {
  ctx.fillStyle = "red";
  ctx.fillRect(mzaX * tamano, mzaY * tamano, tamanoCasillas, tamanoCasillas);
}

// Funcion IF, si la manzana choca con la cabeza se genera una nueva manzana, se alarga la viborita y el score suma en uno
function colisionMza() {
  if (mzaX === cabezaX && mzaY == cabezaY) {
    mzaX = Math.floor(Math.random() * casillas);
    mzaY = Math.floor(Math.random() * casillas);
    longitud++;
    scoreDisplay.textContent = score++;
  }
}

// Funcion Movimiento
document.body.addEventListener("keydown", keyDown);
function keyDown(event) {
  //Arriba
  if (event.keyCode == 38) {
    if (velocidadY == 1) return;
    velocidadY = -1;
    velocidadX = 0;
  }

  //Abajo
  if (event.keyCode == 40) {
    if (velocidadY == -1) return;
    velocidadY = 1;
    velocidadX = 0;
  }

  //Izquierda
  if (event.keyCode == 37) {
    if (velocidadX == 1) return;
    velocidadY = 0;
    velocidadX = -1;
  }

  //Derecha
  if (event.keyCode == 39) {
    if (velocidadX == -1) return;
    velocidadY = 0;
    velocidadX = 1;
  }
}

juego();

// FUNCION PARA VENTANA EMERGENTE
var modal = document.getElementById("instrucciones");
var boton = document.getElementById("instruccionesIcon");
var span = document.getElementsByClassName("cerrar")[0];
var body = document.getElementsByTagName("body")[0];

boton.onclick = function () {
  modal.style.display = "flex";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// FUNCION PARA EL INPUT NOMBRE

//Se utiliza para que el campo de texto solo acepte letras
function soloLetras(e) {
  const key = e.keyCode || e.which;
  // MAYUSCULAS || minusculas
  if ((key >= 65 && key <= 90) || (key >= 97 && key <= 122)) {
    if (usuario.length < 3) {
      usuario += String.fromCharCode(key);
    }
    return true;
  }
  return false;
}
