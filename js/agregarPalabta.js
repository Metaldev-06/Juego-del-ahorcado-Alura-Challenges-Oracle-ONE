btnAgregar.addEventListener("click", (e) => {
  e.preventDefault();
  palabras.push(input.value.toUpperCase());

  localStorage.setItem("palabras", JSON.stringify(palabras));

  palabrasLocal = JSON.parse(localStorage.getItem("palabras"));
  console.log(palabrasLocal);

  localStorage.setItem("palabras", JSON.stringify(palabrasLocal));
});
