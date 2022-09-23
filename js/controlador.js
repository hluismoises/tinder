const opcionUsuario = 1
const opcionPerfiles = 2
const opcionMatches = 3

const seleccionarOpcion = (opcion) => {
  switch (opcion) {
    case opcionUsuario:
      console.log("Visualizar usuarios")
      document.getElementById("opcion-usuario").classList.add("active")
      document
        .getElementById("opcion-perfiles")
        .classList.remove("flama-activa")
      document
        .getElementById("opcion-matches")
        .classList.remove("estrella-activa")
      break
    case opcionPerfiles:
      console.log("Visualizar perfiles")
      document.getElementById("opcion-usuario").classList.remove("active")
      document.getElementById("opcion-perfiles").classList.add("flama-activa")
      document
        .getElementById("opcion-matches")
        .classList.remove("estrella-activa")
      document.getElementById("opcion-activa").style.transform =
        "translateX(0%)"
      break
    case opcionMatches:
      console.log("Visualizar matches")
      document.getElementById("opcion-usuario").classList.remove("active")
      document
        .getElementById("opcion-perfiles")
        .classList.remove("flama-activa")
      document.getElementById("opcion-matches").classList.add("estrella-activa")
      document.getElementById("opcion-activa").style.transform =
        "translateX(107%)"
      break
    default:
      break
  }
}
