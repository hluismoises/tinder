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

      agregarMatches(usuarioSeleccionado - 1)
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

  if (validarMatches() && usuarioSeleccionado - 1 != 0) {
    renderizarPerfil(usuarios[perfilActual])
    perfilActual = 0
  } else {
    perfilSiguiente()
  }

  if (usuarioSeleccionado - 1 === 0) {
    renderizarPerfil(usuarios[1])
    perfilActual = 1
  }
}

const validarMatches = () => {
  let haceMatch = false

  for (
    let i = 0;
    i < usuarios[usuarioSeleccionado - 1].generoInteres.length;
    i++
  ) {
    if (
      usuarios[usuarioSeleccionado - 1].generoInteres[i] ==
      usuarios[perfilActual].genero
    ) {
      if (
        !usuarios[usuarioSeleccionado - 1].likes.includes(
          usuarios[perfilActual].id
        )
      ) {
        haceMatch = true
        break
      }
    }
  }

  return haceMatch
}

const perfilAnterior = () => {
  document
    .getElementById("corazon")
    .classList.remove("boton-corazon-seleccionado")
  perfilActual--
  if (perfilActual < 0) {
    perfilActual = usuarios.length - 1
  } else if (perfilActual === usuarioSeleccionado - 1 && perfilActual > 0) {
    perfilActual--
  } else if (perfilActual === usuarioSeleccionado - 1 && perfilActual === 0) {
    perfilActual = usuarios.length - 1
  }

  if (validarMatches()) {
    renderizarPerfil(usuarios[perfilActual])
  } else {
    perfilAnterior()
  }
  //renderizarPerfil(usuarios[perfilActual])
  console.log(validarMatches())
  console.log("perfil anterior", perfilActual)
}

const perfilSiguiente = () => {
  document
    .getElementById("corazon")
    .classList.remove("boton-corazon-seleccionado")
  perfilActual++

  if (perfilActual === usuarios.length) {
    perfilActual = 0
  }
  if (
    perfilActual === usuarioSeleccionado - 1 &&
    perfilActual < usuarios.length - 1
  ) {
    perfilActual++
  }
  if (
    perfilActual === usuarioSeleccionado - 1 &&
    perfilActual === usuarios.length - 1
  ) {
    perfilActual = 0
  }

  if (validarMatches()) {
    renderizarPerfil(usuarios[perfilActual])
  } else {
    perfilSiguiente()
  }

  //console.log(validarMatches())
  //console.log("perfil siguiente", perfilActual)
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

const agregarLikes = () => {
  document.getElementById("corazon").classList.add("boton-corazon-seleccionado")
  usuarios[usuarioSeleccionado - 1].likes.push(usuarios[perfilActual].id)
  localStorage.setItem("usuarios", JSON.stringify(usuarios))
}

const agregarMatches = (id) => {
  let matchesUsuarioSeleccionado = usuarios[id].likes
  let matchesActuales = usuarios[id].matches

  for (let i = 0; i < usuarios.length; i++) {
    for (let j = 0; j < usuarios[i].likes.length; j++) {
      //console.log("likes", usuarios[i].likes[j])
      if (
        matchesUsuarioSeleccionado.includes(usuarios[i].id) &&
        usuarios[i].likes.includes(usuarios[id].id) &&
        !matchesActuales.includes(usuarios[i].id)
      ) {
        console.log(
          `Usuario seleccionado likes ${matchesUsuarioSeleccionado} y usuario con que hizo match id ${usuarios[i].id} porque tiene like ${usuarios[i].likes[j]}`
        )
        usuarios[id].matches.push(usuarios[i].id)
        //usuarios[i].matches.push(usuarios[id].id)
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
        break
      }
    }
  }
}

guardarUsuarios()
generarListaUsuarios()
