let input = document.getElementById("agregarPalabra");
let palabrasLocal;
const btnAgregar = document.getElementById("btnAgregar");

const palabras = [
  "COMER",
  "CASA",
  "CASTILLO",
  "CAMA",
  "ESTADIO",
  "PERSONA",
  "PERRO",
  "GATO",
  "AUTO",
  "HOTEL",
  "MOTEL",
  "PEZ",
  "TRABAJO",
  "MONITOR",
  "BILLETES",
  "BOLSA",
  "BOLSILLO",
  "ALUMNO",
  "CABALLO",
];

btnAgregar.addEventListener("click", (e) => {
  e.preventDefault();
  palabras.push(input.value);

  localStorage.setItem("palabras", JSON.stringify(palabras));

  palabrasLocal = JSON.parse(localStorage.getItem("palabras"));
  console.log(palabrasLocal);

  localStorage.setItem("palabras", JSON.stringify(palabrasLocal));
});
