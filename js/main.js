const letrasCorrectas = document.getElementById("letrasCorrectas");
const btnNuevoJuego = document.getElementById("nuevoJuego");
const btnDesistir = document.getElementById("desistir");
const letrasIncorrectas = document.getElementById("letrasIncorrectas");
const alertCorrect = document.getElementById("alertCorrect");
const alertIncorrect = document.getElementById("alertIncorrect");

let canvas = document.getElementById("draw");
let pincel = canvas.getContext("2d");

const partes = [
  [100, 50, 5, 350], //poste
  [100, 50, 150, 5], //base superior
  [250, 50, 5, 50], //Soga
  [228, 100, 50, 50], //cabeza
  [250, 150, 5, 100], //Torso
  [200, 180, 50, 5], //Brazo izquierdo
  [250, 180, 50, 5], //Brazo derecho
  [200, 245, 50, 5], //Pierna izquierda
  [250, 245, 50, 5], //Pierna Derecha
];

let palabraSeleccionada;
let letrasUsadas;
let errores;
let aciertos;
let intentos = 0;

const addLetter = (letter) => {
  const letterElement = document.createElement("span");
  letterElement.innerHTML = letter.toUpperCase();
  letrasIncorrectas.appendChild(letterElement);
};

const addBodyPart = (bodyPart) => {
  pincel.fillStyle = "black";
  pincel.fillRect(...bodyPart);
};

const wrongLetter = () => {
  addBodyPart(partes[errores]);
  errores++;
  if (errores === partes.length) {
    endGame();
    alertIncorrect.style.display = "flex";
  }
};

const endGame = () => {
  document.removeEventListener("keydown", letterEvent);
};

const correctLetter = (letter) => {
  const { children } = letrasCorrectas;
  for (let i = 0; i < children.length; i++) {
    if (children[i].innerHTML === letter) {
      children[i].classList.toggle("hidden");
      aciertos++;
    }
  }
  if (aciertos === palabraSeleccionada.length) {
    endGame();
    alertCorrect.style.display = "flex";
  }
};

const letterInput = (letter) => {
  if (palabraSeleccionada.includes(letter)) {
    correctLetter(letter);
  } else {
    wrongLetter();
  }
  addLetter(letter);
  letrasUsadas.push(letter);
};

const letterEvent = (event) => {
  let newLetter = event.key.toUpperCase();
  if (newLetter.match(/^[a-zñ]$/i) && !letrasUsadas.includes(newLetter)) {
    letterInput(newLetter);
  }
};

const drawWord = () => {
  palabraSeleccionada.forEach((letter) => {
    const letterElement = document.createElement("span");
    letterElement.innerHTML = letter.toUpperCase();
    letterElement.classList.add("letter");
    letterElement.classList.add("hidden");
    letrasCorrectas.appendChild(letterElement);
  });
};

const selectRandomWord = () => {
  palabrasLocal = JSON.parse(localStorage.getItem("palabras"));
  if (palabrasLocal?.length >= 1) {
    let word =
      palabrasLocal[
        Math.floor(Math.random() * palabrasLocal.length)
      ].toUpperCase();
    palabraSeleccionada = word.split("");
  } else {
    let word =
      palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();
    palabraSeleccionada = word.split("");
  }
};

const drawHangMan = () => {
  pincel.canvas.width = 300;
  pincel.canvas.height = 450;
  pincel.clearRect(0, 0, canvas.width, canvas.height);
  pincel.fillRect(27, 400, 250, 5); //base
};

const startGame = () => {
  letrasUsadas = [];
  errores = 0;
  aciertos = 0;
  letrasCorrectas.innerHTML = "";
  letrasIncorrectas.innerHTML = "";
  drawHangMan();
  selectRandomWord();
  drawWord();
  document.addEventListener("keydown", letterEvent);
  if (intentos >= 1) {
    alertCorrect.style.display = "none";
    alertIncorrect.style.display = "none";
  }
  intentos++;
};

btnNuevoJuego.addEventListener("click", startGame);
btnDesistir.addEventListener("click", () => {
  location.href = "../index.html";
});
window.addEventListener("load", () => startGame());
