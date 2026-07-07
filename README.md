# Portal de Videos Instructivos

Aplicacion web estatica para publicar videos instructivos institucionales por perfil de usuario. Funciona sin backend, base de datos, APIs ni frameworks, por lo que puede publicarse directamente en GitHub Pages.

## Estructura

```text
/
├── index.html
├── paginas/
├── css/
├── js/
├── videos/
├── img/
│   └── miniaturas/
└── iconos/
```

## Agregar un video

1. Copia el archivo de video en la carpeta de su categoria dentro de `videos/`. Se recomienda usar MP4 con codec H.264/AAC para mayor compatibilidad en navegadores y GitHub Pages.
2. Copia la miniatura en `img/miniaturas/`.
3. Agrega un objeto en el archivo del perfil correspondiente dentro de `js/datos-videos/`.

Ejemplo:

```js
{
  id: "nombre-unico-del-video",
  categoria: "farmacia",
  titulo: "Titulo del instructivo",
  descripcion: "Descripcion completa del proceso.",
  video: "videos/farmacia/nombre-del-video.mp4",
  miniatura: "img/miniaturas/nombre-miniatura.jpg"
}
```

## Archivos de videos por perfil

Cada perfil tiene su propio archivo:

```text
js/datos-videos/
├── jefe-enfermeria.js
├── auxiliar-enfermeria.js
├── medico.js
├── farmacia.js
├── laboratorio.js
├── facturacion.js
├── urgencias.js
├── sistemas.js
└── talento-humano.js
```

Ejemplo para agregar un video en Farmacia:

```js
window.registrarVideos([
  {
    id: "nombre-unico-del-video",
    categoria: "farmacia",
    titulo: "Titulo del instructivo",
    descripcion: "Descripcion completa del proceso.",
    video: "videos/farmacia/nombre-del-video.mp4",
    miniatura: "img/miniaturas/nombre-miniatura.jpg"
  }
]);
```

Si el archivo ya tiene videos, agrega el nuevo objeto dentro del arreglo, separado por coma.

## Agregar una categoria

Edita `js/categorias.js` y agrega un objeto con `id` y `nombre`. El `id` debe coincidir con el valor `categoria` usado en el archivo correspondiente de `js/datos-videos/`.

## Publicacion en GitHub Pages

Sube el repositorio a GitHub y activa Pages desde la rama principal. La pagina de inicio es `index.html`.
