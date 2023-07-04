// Participante del modelo de naciones unidas
class Participante {
    constructor(nombre, apellido, edad, pais) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
      this.pais = pais;
    }
  }
  
  const listaParticipantes = [];
  
  // Inscripción
  function realizarInscripcion() {
    const nombre = prompt("Ingresa tu nombre:");
    const apellido = prompt("Ingresa tu apellido:");
    const edad = parseInt(prompt("Ingresa tu edad:"));
    const pais = prompt("Ingresa tu país:");
  
    const participante = new Participante(nombre, apellido, edad, pais);
    listaParticipantes.push(participante);
    alert("¡Inscripción exitosa!");
  }
  
  function mostrarParticipantes() {
    console.log("Lista de participantes inscritos:");
    listaParticipantes.forEach((participante, index) => {
      console.log(`#${index + 1} - Nombre: ${participante.nombre} ${participante.apellido}, Edad: ${participante.edad}, País: ${participante.pais}`);
    });
  }
  
  let opcion; 
  
  do {
    opcion = prompt(`Selecciona una opción:
    1. Realizar inscripción
    2. Mostrar participantes inscritos
    3. Salir
  
    Opción:`);
  
    switch (opcion) {
      case "1":
        realizarInscripcion();
        break;
      case "2":
        mostrarParticipantes();
        break;
      case "3":
        console.log("Gracias por usar el sistema de inscripción.");
        break;
      default:
        console.log("Opción inválida. Por favor, elija una opción válida.");
        break;
    }
  } while (opcion !== "3");