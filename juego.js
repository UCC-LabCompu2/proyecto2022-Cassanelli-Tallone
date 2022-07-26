/**
 * Audio de Fondo en volumen bajo
 * @method setHalfVolume
 */
function setHalfVolume() {
  let myAudio = document.getElementById("audio1");
  myAudio.volume = 0.1;
}

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

const CABEZA_X = 18;
const CABEZA_Y = 18;
const MANZANA_X = 1;
const MANZANA_Y = 1;
const LONGITUD = 2;

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
let myInterval;
const botonPlay = document.getElementById("botonPlay");

/**
 * Funcion principal para el funcionamiento del juego
 * @method juego
 */
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
      usuario = " ";
    }
    reinicarEstadoInicial();
    return;
  }

  limpiar();
  colisionMza();
  dibujarMza();
  dibujarSnake();
  dibujarScore();
}

/**
 * Funcion de colision, para saber cuando la viborita choca
 * @method GameOver
 */
function GameOver() {
  let gameOver = false;

  if (velocidadX === 0 && velocidadY === 0) {
    return false;
  }
  // Permite chocar contra la pared Izquierda
  if (cabezaX < 0) {
    gameOver = true;
  }
  // Permite chocar contra la pared Derecha
  if (cabezaX >= casillas) {
    gameOver = true;
  }
  // Permite chocar contra la pared de Arriba
  if (cabezaY < 0) {
    gameOver = true;
  }
  // Permite chocar contra la pared de Abajo
  if (cabezaY >= casillas) {
    gameOver = true;
  }
  // Permite chocar contra si misma
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

/**
 * Reinicia los procesos a 0 tanto score, como movimientos
 * @method reinicarEstadoInicial
 */

function reinicarEstadoInicial() {
  longitud = LONGITUD;
  partesSnake = [];
  velocidadX = 0;
  velocidadY = 0;
  cabezaX = CABEZA_X;
  cabezaY = CABEZA_Y;
  mzaX = MANZANA_X;
  mzaY = MANZANA_Y;
  score = 0;
  clearInterval(myInterval);
}

/**
 * Da el OK para comenzar a jugar con el IF del nombre,
 * incluido el SetInterval que realiza N veces la funcion JUEGO
 * @method volverAJugar
 */
function volverAJugar() {
  reinicarEstadoInicial();

  if (usuario) {
    myInterval = setInterval(juego, 1000 / velocidad);
  } else {
    alert("Debes escribir un nombre para poder Jugar!");
  }
}

/**
 * Cambia el Score
 * @method dibujarScore
 */
function dibujarScore() {
  scoreDisplay.innerHTML = score;
}

/**
 * Limpia el trazo de la viborita tapado del mismo color que el canvas
 * @method limpiar
 */
function limpiar() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Dibuja la viborita del tamaño inicializado ya sea la cabeza, cuerpo o posible creacion de una parte
 * @method dibujarSnake
 */
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

  // El push funciona como arreglo pero si se añade algo lo envia al final
  partesSnake.push(new parteSnake(cabezaX, cabezaY));
  if (partesSnake.length > longitud) {
    partesSnake.shift();
    // Cuando se pone shift desplaza todos los elementos una posicion adelante si se mueve el primero
  }

  ctx.fillStyle = "purple";
  ctx.fillRect(
    cabezaX * tamano,
    cabezaY * tamano,
    tamanoCasillas,
    tamanoCasillas
  );
}

/**
 * Cambio de posicion en la grilla, suma o resta de a 1 que significa el cambio de casilla
 * @method cambioPosicion
 */
function cambioPosicion() {
  cabezaX = cabezaX + velocidadX;
  cabezaY = cabezaY + velocidadY;
}

/**
 * Dibuja Manzana
 * @method dibujarMza
 */
function dibujarMza() {
  ctx.fillStyle = "red";
  ctx.fillRect(mzaX * tamano, mzaY * tamano, tamanoCasillas, tamanoCasillas);
}

//
/**
 * Funcion IF, si la manzana choca con la cabeza se genera una nueva manzana,
 * se alarga la viborita y el score suma en uno
 * @method colisionMza
 */
function colisionMza() {
  if (mzaX === cabezaX && mzaY === cabezaY) {
    mzaX = Math.floor(Math.random() * casillas);
    mzaY = Math.floor(Math.random() * casillas);
    longitud++;
    scoreDisplay.textContent = score++;
  }
}

document.body.addEventListener("keydown", keyDown);
/**
 * Funcion Movimiento
 * @method keyDown
 * @param (event)
 *  */
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

// FUNCION PARA VENTANA EMERGENTE
let modal = document.getElementById("instrucciones");
let boton = document.getElementById("instruccionesIcon");
let span = document.getElementsByClassName("cerrar")[0];
let body = document.getElementsByTagName("body")[0];

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

/**
 * Se utiliza para que el campo de texto solo acepte letras
 * @method soloLetras
 * @param (e)
 */

function soloLetras(e) {
  const key = e.keyCode || e.which;
  // MAYUSCULAS || minusculas
  if ((key >= 65 && key <= 90) || (key >= 97 && key <= 122)) {
    if (usuario.length < 3) {
      usuario += String.fromCharCode(key);
    }
    return true;
  } else {
    alert("No se permiten esos tipos de caracteres. ");
  }
  return false;
}
