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

1. Copia el archivo MP4 en la carpeta de su categoria dentro de `videos/`.
2. Copia la miniatura en `img/miniaturas/`.
3. Agrega un objeto en `js/videos.js`.

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

## Agregar una categoria

Edita `js/categorias.js` y agrega un objeto con `id` y `nombre`. El `id` debe coincidir con el valor `categoria` usado en `js/videos.js`.

## Publicacion en GitHub Pages

Sube el repositorio a GitHub y activa Pages desde la rama principal. La pagina de inicio es `index.html`.
