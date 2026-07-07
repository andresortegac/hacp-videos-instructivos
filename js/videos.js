// Cargador central de videos.
// Los videos se administran por perfil en js/datos-videos/.
window.videos = [];

window.registrarVideos = function registrarVideos(listaVideos) {
  window.videos.push(...listaVideos);
};

window.obtenerVideo = function obtenerVideo(id) {
  return window.videos.find((video) => video.id === id);
};
