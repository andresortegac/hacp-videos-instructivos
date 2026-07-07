const state = {
  categoria: new URLSearchParams(window.location.search).get("categoria") || "todos",
  busqueda: ""
};

const els = {
  categoryList: document.querySelector("#categoryList"),
  categoryCounter: document.querySelector("#categoryCounter"),
  searchInput: document.querySelector("#searchInput"),
  videoGrid: document.querySelector("#videoGrid"),
  emptyState: document.querySelector("#emptyState"),
  videosTitle: document.querySelector("#videosTitle"),
  resultCounter: document.querySelector("#resultCounter"),
  modal: document.querySelector("#videoModal"),
  modalPlayer: document.querySelector("#modalPlayer"),
  modalTitle: document.querySelector("#modalTitle"),
  modalDescription: document.querySelector("#modalDescription"),
  modalPageLink: document.querySelector("#modalPageLink")
};

function contarVideosPorCategoria(categoriaId) {
  return window.videos.filter((video) => video.categoria === categoriaId).length;
}

function renderCategorias() {
  const botones = [
    { id: "todos", nombre: "Todos", total: window.videos.length },
    ...window.categorias.map((categoria) => ({
      ...categoria,
      total: contarVideosPorCategoria(categoria.id)
    }))
  ];

  els.categoryCounter.textContent = window.categorias.length;
  els.categoryList.innerHTML = botones.map((categoria) => `
    <button class="category-button${state.categoria === categoria.id ? " is-active" : ""}" type="button" data-category="${categoria.id}">
      <span>${categoria.nombre}</span>
      <strong>${categoria.total}</strong>
    </button>
  `).join("");
}

function crearVideoCard(video) {
  const categoria = window.obtenerCategoria(video.categoria);

  return `
    <article class="video-card">
      <img src="${video.miniatura}" alt="Miniatura de ${video.titulo}" loading="lazy" onerror="this.src='img/default.jpg'">
      <div class="video-card__body">
        <p class="video-card__category">${categoria ? categoria.nombre : "Sin categoria"}</p>
        <h3>${video.titulo}</h3>
        <button class="button" type="button" data-video="${video.id}">Ver video</button>
      </div>
    </article>
  `;
}

function renderVideos() {
  const resultados = window.filtrarVideos(window.videos, state.categoria, state.busqueda);
  const categoria = window.obtenerCategoria(state.categoria);

  els.videosTitle.textContent = state.categoria === "todos" ? "Todos los videos" : categoria?.nombre || "Videos";
  els.resultCounter.textContent = `${resultados.length} ${resultados.length === 1 ? "video" : "videos"}`;
  els.videoGrid.innerHTML = resultados.map(crearVideoCard).join("");
  els.emptyState.hidden = resultados.length > 0;
}

function actualizarUrlCategoria() {
  const url = new URL(window.location.href);

  if (state.categoria === "todos") {
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

function crearReproductor(video) {
  if (esYoutube(video.video)) {
    return `<iframe src="${obtenerYoutubeEmbed(video.video)}" title="${video.titulo}" allowfullscreen loading="lazy"></iframe>`;
  }

  return `
    <video controls preload="metadata" poster="${video.miniatura}">
      <source src="${video.video}" type="video/mp4">
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
  els.modalPageLink.href = `paginas/video.html?id=${encodeURIComponent(video.id)}`;
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
