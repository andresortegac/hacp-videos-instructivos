// Las categorias representan perfiles de usuario y se administran desde este archivo.
window.categorias = [
  { id: "jefe-enfermeria", nombre: "Jefe de Enfermeria" },
  { id: "auxiliar-enfermeria", nombre: "Auxiliar de Enfermeria" },
  { id: "medico", nombre: "Medico" },
  { id: "farmacia", nombre: "Farmacia" },
  { id: "laboratorio", nombre: "Laboratorio" },
  { id: "facturacion", nombre: "Facturacion" },
  { id: "urgencias", nombre: "Urgencias" },
  { id: "sistemas", nombre: "Sistemas" },
  { id: "talento-humano", nombre: "Talento Humano" }
];

window.obtenerCategoria = function obtenerCategoria(id) {
  return window.categorias.find((categoria) => categoria.id === id);
};
