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
      document.getElementById("contenido-1").style.display = "block"
      document.getElementById("contenido-2").style.display = "none"
      document.getElementById("contenido-3").style.display = "none"
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

      document.getElementById("contenido-1").style.display = "none"
      document.getElementById("contenido-2").style.display = "block"
      document.getElementById("contenido-3").style.display = "none"
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
      document.getElementById("contenido-1").style.display = "none"
      document.getElementById("contenido-2").style.display = "none"
      document.getElementById("contenido-3").style.display = "block"
      break
    default:
      break
  }
}
