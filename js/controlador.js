const opcionUsuario = 1
const opcionPerfiles = 2
const opcionMatches = 3

let usuarioSeleccionado = null
let perfilActual = 0

const seleccionarOpcion = (opcion) => {
  switch (opcion) {
    case opcionUsuario:
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
      if (usuarioSeleccionado !== null) {
        generarMatches(usuarios[usuarioSeleccionado - 1])
        //console.log(usuarios[usuarioSeleccionado - 1])
      }
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
    <img src="/Imagenes/${user.imagenPerfil}" alt="" onclick="seleccionarOpcion(2)" />
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

  if (usuarioSeleccionado - 1 != 0) {
    renderizarPerfil(usuarios[0])
    perfilActual = 0
  } else {
    renderizarPerfil(usuarios[1])
    perfilActual = 1
  }
}

const perfilAnterior = () => {
  if (perfilActual === 0) {
    perfilActual = usuarios.length - 1
  } else {
    perfilActual--
    if (perfilActual === usuarioSeleccionado - 1 && perfilActual > 0) {
      perfilActual--
    }
    if (perfilActual === 0) {
      perfilActual = usuarios.length - 1
    }
  }

  renderizarPerfil(usuarios[perfilActual])
}

const perfilSiguiente = () => {
  if (perfilActual === usuarios.length - 1) {
    perfilActual = 0
  } else {
    perfilActual++
    if (
      perfilActual === usuarioSeleccionado - 1 &&
      perfilActual < usuarios.length - 1
    ) {
      perfilActual++
    }
    if (perfilActual === usuarios.length - 1) {
      perfilActual = 0
    }
  }

  for (
    let i = 0;
    i < usuarios[usuarioSeleccionado - 1].generoInteres.length;
    i++
  ) {
    if (
      usuarios[usuarioSeleccionado - 1].generoInteres[i] ==
      usuarios[perfilActual].genero
    ) {
      console.log("Hace match")
    }
  }

  renderizarPerfil(usuarios[perfilActual])
}

const renderizarPerfil = (usuario) => {
  let gustos = ""
  for (let i = 0; i < usuario.intereses.length; i++) {
    gustos += `<div class='item-gusto'>${usuario.intereses[i]}</div>`
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

const generarMatches = (usuario) => {
  document.getElementById("lista-matches").innerHTML = ""
  for (let i = 0; i < usuario.matches.length; i++) {
    console.log(usuario.matches[i])
    idUsuarioDelMatch = usuarios[usuario.matches[i] - 1]
    console.log(idUsuarioDelMatch)
    document.getElementById("lista-matches").innerHTML += `
    <div class="tarjeta-usuario">
          <!-- card -->
          <div class="imagen">
            <img src="/Imagenes/${idUsuarioDelMatch.imagenPerfil}" alt="" />
          </div>
          <div class="detalles">
          <div>
            <span class="nombre">${
              idUsuarioDelMatch.nombre
            }</span><span class="edad">${idUsuarioDelMatch.edad}</span>
            ${
              idUsuarioDelMatch.verificado
                ? '<span class="icono-check"><i class="fa-solid fa-circle-check"></i></span>'
                : ""
            }
          </div>
          
          <div>
            <span><i class="fa-solid fa-briefcase"></i>${
              idUsuarioDelMatch.ocupacion
            }</span>
          </div>
          <div>
            <span><i class="fa-solid fa-location-dot"></i>${
              idUsuarioDelMatch.ciudad
            }</span>
          </div>

          </div>
    </div>
    `
  }
}

const agregarMatch = () => {
  usuarios[usuarioSeleccionado - 1].matches.push(usuarios[perfilActual].id)
}

guardarUsuarios()
generarListaUsuarios(1)
