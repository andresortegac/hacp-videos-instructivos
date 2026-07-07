window.normalizarTexto = function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
};

window.filtrarVideos = function filtrarVideos(videos, categoriaActiva, terminoBusqueda) {
  const termino = window.normalizarTexto(terminoBusqueda);

  return videos
    .filter((video) => categoriaActiva === "todos" || video.categoria === categoriaActiva)
    .filter((video) => !termino || window.normalizarTexto(video.titulo).includes(termino))
    .sort((a, b) => a.titulo.localeCompare(b.titulo, "es", { sensitivity: "base" }));
};
