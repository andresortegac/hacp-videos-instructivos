// Archivo central para administrar todos los instructivos del portal.
// Para agregar un video:
// 1. Copia el MP4 en videos/nombre-categoria/.
// 2. Copia la miniatura en img/miniaturas/.
// 3. Agrega un nuevo objeto en este arreglo.
window.videos = [
  {
    id: "registro-paciente-urgencias",
    categoria: "urgencias",
    titulo: "Registro inicial de paciente en urgencias",
    descripcion: "Guia paso a paso para registrar correctamente la admision inicial de un paciente en el servicio de urgencias.",
    video: "videos/urgencias/registro-paciente-urgencias.mp4",
    miniatura: "img/miniaturas/urgencias-registro.jpg"
  },
  {
    id: "dispensacion-medicamentos",
    categoria: "farmacia",
    titulo: "Dispensacion segura de medicamentos",
    descripcion: "Instructivo para validar ordenes, verificar medicamentos y completar el proceso de dispensacion institucional.",
    video: "videos/farmacia/dispensacion-medicamentos.mp4",
    miniatura: "img/miniaturas/farmacia-dispensacion.jpg"
  },
  {
    id: "solicitud-examen-laboratorio",
    categoria: "laboratorio",
    titulo: "Solicitud de examenes de laboratorio",
    descripcion: "Procedimiento para crear, revisar y confirmar solicitudes de examenes desde el sistema institucional.",
    video: "videos/laboratorio/solicitud-examen-laboratorio.mp4",
    miniatura: "img/miniaturas/laboratorio-solicitud.jpg"
  },
  {
    id: "cierre-turno-enfermeria",
    categoria: "jefe-enfermeria",
    titulo: "Cierre de turno de enfermeria",
    descripcion: "Recomendaciones para consolidar novedades, validar pendientes y dejar trazabilidad del cierre de turno.",
    video: "videos/jefe-enfermeria/cierre-turno-enfermeria.mp4",
    miniatura: "img/miniaturas/enfermeria-cierre-turno.jpg"
  },
  {
    id: "reporte-incidencias-sistemas",
    categoria: "sistemas",
    titulo: "Reporte de incidencias a sistemas",
    descripcion: "Como documentar una incidencia tecnologica, adjuntar evidencias y hacer seguimiento al caso reportado.",
    video: "videos/sistemas/reporte-incidencias-sistemas.mp4",
    miniatura: "img/miniaturas/sistemas-incidencias.jpg"
  },
  {
    id: "radicacion-cuenta-facturacion",
    categoria: "facturacion",
    titulo: "Radicacion de cuenta para facturacion",
    descripcion: "Proceso para preparar soportes, validar datos y radicar una cuenta segun los lineamientos de facturacion.",
    video: "videos/facturacion/radicacion-cuenta-facturacion.mp4",
    miniatura: "img/miniaturas/facturacion-radicacion.jpg"
  }
];

window.obtenerVideo = function obtenerVideo(id) {
  return window.videos.find((video) => video.id === id);
};
