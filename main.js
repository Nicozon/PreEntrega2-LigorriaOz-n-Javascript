// Participante del modelo de naciones unidas
class Participante {
  constructor(nombre, apellido, organismo, pais) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.organismo = organismo;
    this.pais = pais;
  }
}

// AAAAAAAAAAAAAAAAAAAAAA
// Obtener referencia al elemento select "pais"
const selectPais = document.getElementById("pais");
// Obtener referencia al div para mostrar la información del país inscrito
const paisInscritoDiv = document.getElementById("paisInscrito");
// Obtener referencias a los elementos donde se mostrará la información del país
const nombrePais = document.getElementById("nombrePais");
const capitalPais = document.getElementById("capitalPais");
const poblacionPais = document.getElementById("poblacionPais");
// AAAAAAAAAAAAAAAAAAAAAA

// Función para verificar si ya existe un participante con el mismo nombre y apellido
function verificarNombreApellidoRepetido(nombre, apellido) {
  for (const participante of listaParticipantes) {
    if (participante.nombre === nombre && participante.apellido === apellido) {
      return true; // El nombre y apellido ya existen, se encontró un participante con el mismo nombre y apellido
    }
  }
  return false; // El nombre y apellido no se encontraron, no están repetidos
}

// Función para verificar si ya hay dos participantes inscritos desde un país y organismo específicos
function verificarParticipantesPorPaisYOrganismo(pais, organismo) {
  let contador = 0;
  for (const participante of listaParticipantes) {
    if (participante.pais === pais && participante.organismo === organismo) {
      contador++;
    }
  }
  return contador;
}

let listaParticipantes = [];

// Obtener referencia al formulario
const formulario = document.getElementById("formularioInscripcion");

// Función para realizar la inscripción
function realizarInscripcion(event) {
  event.preventDefault(); // Evitar el comportamiento por defecto del formulario
  const nombre = formulario.nombre.value;
  const apellido = formulario.apellido.value;
  const organismo = formulario.organismo.options[formulario.organismo.selectedIndex].value;
  const pais = formulario.pais.options[formulario.pais.selectedIndex].value

// Verificar si el nombre y apellido ya están repetidos
  if (verificarNombreApellidoRepetido(nombre, apellido)) {
    // Puedes mostrar un mensaje de error con SweetAlert
    swal("Error", "El nombre y apellido ya están registrados.", "error");
    return;
  }

// Verificar si ya hay dos participantes inscritos desde el mismo país y organismo
  if (verificarParticipantesPorPaisYOrganismo(pais, organismo) >= 2) {
// Puedes mostrar un mensaje de error con SweetAlert
  swal("Error", "Ya hay dos participantes inscritos desde este país y organismo.", "error");
  return;
}
// New participante
  const participante = new Participante(nombre, apellido, organismo, pais);
  listaParticipantes.push(participante);
  guardarEnLocalStorage(); 

// AAAAAAAAAAAAAAAAAAAAAAAAAAAA
 // Mostrar la información del país inscrito en el div correspondiente
mostrarPaisInscrito(pais);
// AAAAAAAAAAAAAAAAAAAAAAAAAAAAA

// Guardar en local storage
  mostrarParticipantes();

  // Utilizamos SweetAlert para mostrar el mensaje de inscripción exitosa
  swal("¡Inscripción exitosa!", "", "success");

// Limpiar el formulario después de la inscripción
  formulario.reset();
}

// Agregar el evento "submit" al formulario para realizar la inscripción
  formulario.addEventListener("submit", realizarInscripcion);

function mostrarParticipantes() {
  const listaParticipantesElement = document.getElementById("listaParticipantes");
  listaParticipantesElement.innerHTML = ""; // Limpiar la lista antes de mostrar los participantes

  console.log("Lista de participantes inscritos:");
  listaParticipantes.forEach((participante, index) => {
  console.log(`#${index + 1} - Nombre: ${participante.nombre} ${participante.apellido}, Organismo: ${participante.organismo}, País: ${participante.pais}`);

// Mostrar el participante en el HTML
    const li = document.createElement("li");
    li.textContent = `#${index + 1} - Nombre: ${participante.nombre} ${participante.apellido}, Organismo: ${participante.organismo}, País: ${participante.pais}`;
    listaParticipantesElement.appendChild(li);
  });
}

// Función para guardar la lista de participantes en Local Storage
  function guardarEnLocalStorage() {
    const listaParticipantesJSON = JSON.stringify(listaParticipantes);
    localStorage.setItem("listaParticipantes", listaParticipantesJSON);
}

// Función para obtener la lista de participantes desde Local Storage (si existe)
  function obtenerDesdeLocalStorage() {
    const listaParticipantesJSON = localStorage.getItem("listaParticipantes");
    if (listaParticipantesJSON) {
      listaParticipantes = JSON.parse(listaParticipantesJSON);
      mostrarParticipantes(); // Actualizar la lista al cargar los datos desde Local Storage
  }
}

// Cargar la lista de participantes al cargar la página
  obtenerDesdeLocalStorage();

// Obtener referencia al botón "Limpiar lista"
  const btnLimpiarLista = document.getElementById("btnBorrarLista");
  function borrarLista() {
// Utilizamos SweetAlert para mostrar una alerta de confirmación antes de borrar la lista
    swal({
      title: "¿Estás seguro?",
      text: "Esto eliminará todos los participantes de la lista.",
      icon: "warning",
      buttons: ["Cancelar", "Sí, estoy seguro"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        listaParticipantes.length = 0;
        mostrarParticipantes();
        swal("¡Borrado!", {
          icon: "success",
        });
      }
    });
  }


// Agregar el evento "click" al botón para limpiar la lista
  btnBorrarLista.addEventListener("click", borrarLista);

// AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
  // Limpiar la información previa del país inscrito
  nombrePais.textContent = "";
  capitalPais.textContent = "";
  poblacionPais.textContent = "";


function mostrarPaisInscrito(pais) {
  // Realizar el fetch a la API con el país seleccionado
  fetch(`https://restcountries.com/v3.1/name/${pais}`)
    .then(response => response.json())
    .then(data => {
      // Obtener la información del país desde la API
      const countryInfo = data[0]; // Suponiendo que el primer resultado contiene la información del país

      // Mostrar la información del país en el div correspondiente
      nombrePais.textContent = `Nombre del país: ${countryInfo.name.common}`;
      capitalPais.textContent = `Capital: ${countryInfo.capital}`;
      poblacionPais.textContent = `Población: ${countryInfo.population}`;
    })
    .catch(error => {
      console.error("Error al obtener información del país:", error);
    });
}
// AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA