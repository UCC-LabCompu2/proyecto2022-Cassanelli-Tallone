// Audio de Fonndo
function setHalfVolume() {
  var myAudio = document.getElementById("audio1");
  myAudio.volume = 0.1;
}

// Se llaman a los elementos creados en HTML
const canvas = document.getElementById("canvasSnake");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.querySelector(".marcador");

class parteSnake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// Se inicializan variables
let velocidad = 10;
let casillas = 20;
let tamano = canvas.width / casillas;
let tamanoCasillas = tamano - 1;
let cabezaX = 10;
let cabezaY = 10;
const partesSnake = [];
let longitud = 2;
let mzaX = 5;
let mzaY = 5;
let velocidadX = 0;
let velocidadY = 0;
let score = 0;
const botonPlay = document.getElementById("botonPlay");

// Funcion principal para el funcionamiento del juego
function juego() {
  cambioPosicion();

  let resultado = GameOver();
  if (resultado) {
    return;
  }

  limpiar();
  colisionMza();
  dibujarMza();
  dibujarSnake();
  dibujarScore();
  setTimeout(juego, 1000 / velocidad);
}

volverAJugar();
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
    ctx.font = "50px Arial";
    ctx.fillText("Perdiste JAJA", canvas.width / 5, canvas.height / 2);
    volverAJugar();
  }
  return gameOver;
}

// Cuando se pierde, esta funcion vuelve a jugar desde el boton PLAY
function volverAJugar() {
  botonPlay.style.visibility = "visible";
  botonPlay.style.opacity = "1";

  cargarPantalla();
}

// Actualiza la pestaña para dejar el campo listo para jugar
function cargarPantalla() {
  botonPlay.addEventListener("click", function () {
    window.location.reload();
  });
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

if (document.getElementsByClassName("botonesCI")) {
  var modal = document.getElementById("instrucciones");
  var boton = document.getElementsByClassName("botonesCI")[0];
  var span = document.getElementsByClassName("cerrar")[0];
  var body = document.getElementsByTagName("body")[0];

  boton.onclick = function () {
    modal.style.display = "block";
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

// FUNCION PARA EL INPUT NOMBRE
//Se utiliza para que el campo de texto solo acepte letras

function soloLetras(e) {
  key = e.keyCode || e.which;
  tecla = String.fromCharCode(key).toString();
  letras = " áéíóúabcdefghijklmnñopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNÑOPQRSTUVWXYZ"; //Se define todo el abecedario que se quiere que se muestre.
  especiales = [8, 37, 39, 46, 6]; //Es la validación del KeyCodes, que teclas recibe el campo de texto.

  tecla_especial = false;
  for (var i in especiales) {
    if (key == especiales[i]) {
      tecla_especial = true;
      break;
    }
  }

  if (letras.indexOf(tecla) == -1 && !tecla_especial) {
    alert("Tecla no aceptada");
    return false;
  }
}
