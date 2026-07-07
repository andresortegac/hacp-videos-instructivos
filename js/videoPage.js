const detail = document.querySelector("#videoDetail");
const params = new URLSearchParams(window.location.search);
const video = window.obtenerVideo(params.get("id"));

function esYoutube(url) {
  return url.includes("youtube.com") || url.includes("youtu.be");
}

function obtenerYoutubeEmbed(url) {
  if (url.includes("youtu.be/")) {
    return `https://www.youtube.com/embed/${url.split("youtu.be/")[1].split("?")[0]}`;
  }

  const parsedUrl = new URL(url);
  const videoId = parsedUrl.searchParams.get("v");
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}

function obtenerTipoVideo(ruta) {
  const extension = ruta.split(".").pop().toLowerCase();
  const tipos = {
    mp4: "video/mp4",
    webm: "video/webm",
    ogv: "video/ogg",
    mkv: "video/x-matroska"
  };

  return tipos[extension] || "video/mp4";
}

function crearReproductor(item) {
  const miniatura = `../${item.miniatura}`;

  if (esYoutube(item.video)) {
    return `<iframe src="${obtenerYoutubeEmbed(item.video)}" title="${item.titulo}" allowfullscreen loading="lazy"></iframe>`;
  }

  return `
    <video controls playsinline preload="metadata" poster="${miniatura}">
      <source src="../${item.video}" type="${obtenerTipoVideo(item.video)}">
      Tu navegador no soporta la reproduccion de video.
    </video>
  `;
}

if (!video) {
  detail.innerHTML = `
    <div class="empty-state empty-state--page">
      <img src="../img/default.jpg" alt="">
      <h1>Video no encontrado</h1>
      <p>Verifica el enlace o regresa al listado principal.</p>
      <a class="button" href="../index.html">Regresar al listado</a>
    </div>
  `;
} else {
  const categoria = window.obtenerCategoria(video.categoria);

  document.title = `${video.titulo} - Portal de Videos Instructivos`;
  detail.innerHTML = `
    <div class="player player--page">${crearReproductor(video)}</div>
    <div class="video-detail__body">
      <p class="eyebrow">${categoria ? categoria.nombre : "Sin categoria"}</p>
      <h1>${video.titulo}</h1>
      <p>${video.descripcion}</p>
      <a class="button button--secondary" href="../index.html?categoria=${encodeURIComponent(video.categoria)}">Regresar al listado</a>
    </div>
  `;
}
