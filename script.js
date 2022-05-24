function setHalfVolume() {
  var myAudio = document.getElementById("audio1");
  myAudio.volume = 0.2;
}

function chequearCanvas() {
  canvas = document.getElementById("canvas");
  canvas.width = 600;
  canvas.height = 600;
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(200,0,0)";
    var x = 50;
    var y = 50;
    var width = 25;
    var height = 25;
    ctx.fillRect(x, y, width, height);
    this.posicionCabeza = [50, 50];
    this.grilla = 10;
  } else {
    alert("El navegador no soporta Canvas");
  }
}

document.onkeydown = function interacturar(accion) {
  var tecla;

  if (accion == null) {
    tecla = window.accion.tecla;
  } else {
    tecla = accion.tecla;
  }

  switch (tecla) {
    case 37:
      posicionCabeza["x"] = posicionCabeza["x"] - grilla;
      ctx.fillRect(posicionCabeza["x"], posicionCabeza["y"], grilla, grilla);
      break;
    case 38:
      posicionCabeza["y"] = posicionCabeza["y"] - grilla;
      ctx.fillRect(posicionCabeza["x"], posicionCabeza["y"], grilla, grilla);
      break;
    case 39:
      posicionCabeza["x"] = posicionCabeza["x"] + grilla;
      ctx.fillRect(posicionCabeza["x"], posicionCabeza["y"], grilla, grilla);
      break;
    case 40:
      posicionCabeza["y"] = posicionCabeza["y"] + grilla;
      ctx.fillRect(posicionCabeza["x"], posicionCabeza["y"], grilla, grilla);
      break;

    default:
      break;
  }
};
