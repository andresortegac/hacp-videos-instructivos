const state = {
  categoria: new URLSearchParams(window.location.search).get("categoria") || "",
  busqueda: ""
};

if (!window.obtenerCategoria(state.categoria)) {
  state.categoria = "";
}

const els = {
  categoryList: document.querySelector("#categoryList"),
  categoryCounter: document.querySelector("#categoryCounter"),
  searchForm: document.querySelector("#searchForm"),
  searchInput: document.querySelector("#searchInput"),
  videoGrid: document.querySelector("#videoGrid"),
  emptyState: document.querySelector("#emptyState"),
  videosTitle: document.querySelector("#videosTitle"),
  resultCounter: document.querySelector("#resultCounter"),
  modal: document.querySelector("#videoModal"),
  modalPlayer: document.querySelector("#modalPlayer"),
  modalTitle: document.querySelector("#modalTitle"),
  modalDescription: document.querySelector("#modalDescription")
};

function contarVideosPorCategoria(categoriaId) {
  return window.videos.filter((video) => video.categoria === categoriaId).length;
}

function renderCategorias() {
  const botones = window.categorias.map((categoria) => ({
      ...categoria,
      total: contarVideosPorCategoria(categoria.id)
    }));

  els.categoryCounter.textContent = window.categorias.length;
  els.categoryList.innerHTML = botones.map((categoria) => `
    <button class="category-button${state.categoria === categoria.id ? " is-active" : ""}" type="button" data-category="${categoria.id}">
      <span>${categoria.nombre}</span>
      <strong>${categoria.total}</strong>
    </button>
  `).join("");
}

function crearVideoCard(video) {
  return `
    <article class="video-card">
      <div class="video-card__body">
        <h3>${video.titulo}</h3>
        <p class="video-card__description">${video.descripcion}</p>
        <button class="button" type="button" data-video="${video.id}">Ver video</button>
      </div>
    </article>
  `;
}

function renderVideos() {
  if (!state.categoria) {
    els.videosTitle.textContent = "Elige una categoria para ver videos";
    els.resultCounter.textContent = "0 videos";
    els.videoGrid.innerHTML = "";
    els.emptyState.querySelector("h3").textContent = "Selecciona un perfil";
    els.emptyState.querySelector("p").textContent = "Los videos se mostraran despues de elegir una categoria.";
    els.emptyState.hidden = false;
    els.searchForm.hidden = true;
    return;
  }

  const resultados = window.filtrarVideos(window.videos, state.categoria, state.busqueda);
  const categoria = window.obtenerCategoria(state.categoria);

  els.videosTitle.textContent = categoria?.nombre || "Videos";
  els.resultCounter.textContent = `${resultados.length} ${resultados.length === 1 ? "video" : "videos"}`;
  els.videoGrid.innerHTML = resultados.map(crearVideoCard).join("");
  els.searchForm.hidden = false;
  els.emptyState.hidden = resultados.length > 0;

  if (resultados.length === 0) {
    els.emptyState.querySelector("h3").textContent = "No se encontraron videos";
    els.emptyState.querySelector("p").textContent = "Prueba con otro titulo dentro del perfil seleccionado.";
  }
}

function actualizarUrlCategoria() {
  const url = new URL(window.location.href);

  if (!state.categoria) {
    url.searchParams.delete("categoria");
  } else {
    url.searchParams.set("categoria", state.categoria);
  }

  window.history.replaceState({}, "", url);
}

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

function crearReproductor(video) {
  if (esYoutube(video.video)) {
    return `<iframe src="${obtenerYoutubeEmbed(video.video)}" title="${video.titulo}" allowfullscreen loading="lazy"></iframe>`;
  }

  return `
    <video controls playsinline preload="metadata" poster="${video.miniatura}">
      <source src="${video.video}" type="${obtenerTipoVideo(video.video)}">
      Tu navegador no soporta la reproduccion de video.
    </video>
  `;
}

function abrirModal(videoId) {
  const video = window.videos.find((item) => item.id === videoId);
  if (!video) return;

  els.modalPlayer.innerHTML = crearReproductor(video);
  els.modalTitle.textContent = video.titulo;
  els.modalDescription.textContent = video.descripcion;
  els.modal.classList.add("is-open");
  els.modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function cerrarModal() {
  els.modal.classList.remove("is-open");
  els.modal.setAttribute("aria-hidden", "true");
  els.modalPlayer.innerHTML = "";
  document.body.classList.remove("modal-open");
}

els.categoryList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  state.categoria = button.dataset.category;
  state.busqueda = "";
  els.searchInput.value = "";
  renderCategorias();
  renderVideos();
  actualizarUrlCategoria();
});

els.searchInput.addEventListener("input", (event) => {
  state.busqueda = event.target.value;
  renderVideos();
});

els.videoGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-video]");
  if (button) abrirModal(button.dataset.video);
});

els.modal.addEventListener("click", (event) => {
  if (event.target.closest("[data-close-modal]")) cerrarModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && els.modal.classList.contains("is-open")) cerrarModal();
});

renderCategorias();
renderVideos();
