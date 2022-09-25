const opcionUsuario = 1
const opcionPerfiles = 2
const opcionMatches = 3

let usuarioSeleccionado = null
let perfilActual = 0

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

const guardarUsuarios = () => {
  if (!localStorage.getItem("usuarios")) {
    localStorage.setItem("usuarios", JSON.stringify(usuariosDataInicial))
  }
}

let usuarios = JSON.parse(localStorage.getItem("usuarios"))

const generarListaUsuarios = () => {
  usuarios.forEach((user) => {
    document.getElementById("lista-usuarios").innerHTML += `
  <div class="usuario" onclick="seleccionarUsuario(${user.id}, this)">
    <img src="/Imagenes/${user.imagenPerfil}" alt="" />
    <span class="etiqueta">${user.nombre}</span>
  </div>
  `
  })
}

const seleccionarUsuario = (idUsuario, etiqueta) => {
  usuarioSeleccionado = idUsuario
  document.querySelectorAll(".usuario").forEach((e) => {
    e.classList.remove("seleccionado")
  })
  etiqueta.classList.add("seleccionado")
  console.log(usuarioSeleccionado)
}

const perfilAnterior = () => {
  if (perfilActual === 0) {
    perfilActual = usuarios.length - 1
  } else {
    perfilActual--
  }

  renderizarPerfil(usuarios[perfilActual])
}

const perfilSiguiente = () => {
  if (perfilActual === usuarios.length - 1) {
    perfilActual = 0
  } else {
    perfilActual++
  }

  renderizarPerfil(usuarios[perfilActual])
}

const renderizarPerfil = (usuario) => {
  let gustos = ""
  for (let i = 0; i < usuario.intereses.length; i++) {
    gustos += `<div class='item-gusto'>${usuario.intereses[i]}</div>`
    console.log("gustos", gustos)
  }

  document.getElementById("perfil-mostrar-detalle").innerHTML = `
  <div id="detalle-perfil" style="background-image: url('/Imagenes/${
    usuario.imagenPortada
  }')">
    <div class="contenedor-detalle-perfil">
      <div>
        <span class="nombre">${usuario.nombre}</span><span class="edad">${
    usuario.edad
  }</span>
        ${
          usuario.verificado
            ? '<span class="icono-check"><i class="fa-solid fa-circle-check"></i></span>'
            : ""
        }
      </div>
      <div>
        <span><i class="fa-solid fa-briefcase"></i>${usuario.ocupacion}</span>
      </div>
      <div>
        <span><i class="fa-solid fa-location-dot"></i>${usuario.ciudad}</span>
      </div>
      <div class="contenerdor-gustos">
        ${gustos}
      </div>
    </div>
  </div>
  `
}

guardarUsuarios()
generarListaUsuarios()
