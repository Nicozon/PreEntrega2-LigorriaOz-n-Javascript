// Participante del modelo de naciones unidas
class Participante {
  constructor(nombre, apellido, edad, pais) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.pais = pais;
  }
}

let listaParticipantes = [];

// Obtener referencia al formulario
const formulario = document.getElementById("formularioInscripcion");

// Función para realizar la inscripción
function realizarInscripcion(event) {
  event.preventDefault(); // Evitar el comportamiento por defecto del formulario
  const nombre = formulario.nombre.value;
  const apellido = formulario.apellido.value;
  const edad = parseInt(formulario.edad.value);
  const pais = formulario.pais.value;

  const participante = new Participante(nombre, apellido, edad, pais);
  listaParticipantes.push(participante);
  guardarEnLocalStorage(); 

// Guardar en local storage
  mostrarParticipantes();
  alert("¡Inscripción exitosa!");

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
  console.log(`#${index + 1} - Nombre: ${participante.nombre} ${participante.apellido}, Edad: ${participante.edad}, País: ${participante.pais}`);

// Mostrar el participante en el HTML
    const li = document.createElement("li");
    li.textContent = `#${index + 1} - Nombre: ${participante.nombre} ${participante.apellido}, Edad: ${participante.edad}, País: ${participante.pais}`;
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

  // Función para limpiar la lista de participantes
  function borrarLista() {
    listaParticipantes.length = 0; // Vaciar el array de participantes
    mostrarParticipantes(); // Actualizar la lista mostrada en el HTML
}
  // Agregar el evento "click" al botón para limpiar la lista
  btnBorrarLista.addEventListener("click", borrarLista);

