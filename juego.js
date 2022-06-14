function setHalfVolume() {
  var myAudio = document.getElementById("audio1");
  myAudio.volume = 0.1;
}

const canvas = document.getElementById("canvasSnake");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.querySelector(".marcador");

class parteSnake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

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

  volverAJugar();

  setTimeout(juego, 1000 / velocidad);
}

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
    ctx.fillText("Perdiste JAJA", canvas.width / 9, canvas.height / 2);

    volverAJugar();
  }

  return gameOver;
}

function volverAJugar() {
  botonPlay.style.visibility = "visible";
  botonPlay.style.opacity = "1";

  cargarPantalla();
}

function cargarPantalla() {
  botonPlay.addEventListener("click", function () {
    window.location.reload();
  });
}

function dibujarScore() {
  ctx.fillStyle = "white";
  ctx.font = "10px Verdana";
  scoreDisplay.innerHTML = score;
  //   ctx.fillText(score, canvas.width + 50, 10);
}

function limpiar() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

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

function cambioPosicion() {
  cabezaX = cabezaX + velocidadX;
  cabezaY = cabezaY + velocidadY;
}

function dibujarMza() {
  ctx.fillStyle = "red";
  ctx.fillRect(mzaX * tamano, mzaY * tamano, tamanoCasillas, tamanoCasillas);
}

function colisionMza() {
  if (mzaX === cabezaX && mzaY == cabezaY) {
    mzaX = Math.floor(Math.random() * casillas);
    mzaY = Math.floor(Math.random() * casillas);
    longitud++;
    scoreDisplay.textContent = score++;
  }
}

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

if (document.getElementsByClassName("botonesCI")[0]) {
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

window.addEventListener("load", () => {
  const colorItems = document.querySelectorAll(".color-item");
  colorItems.forEach((item) => {
    item.addEventListener("click", function () {
      const idSelected = this.id;
      document.body.className = idSelected;
    });
  });
});
