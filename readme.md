# Qué modelo usar

Una web estática y en español que recomienda un modelo de IA según la tarea y el presupuesto. Hecha con Vue, TypeScript, Vite, Tailwind CSS y pnpm. Sin degradados ni backend.

## Desarrollo

```sh
pnpm install
pnpm dev
```

Abre http://localhost:3000. El puerto es fijo: si está ocupado, Vite avisa en lugar de arrancar en otro puerto.

## Comprobaciones y publicación

```sh
pnpm test
pnpm typecheck
pnpm build
pnpm preview
```

Publica la carpeta `dist/` en cualquier alojamiento estático. No requiere claves, variables de entorno ni servicios externos. Las tipografías se sirven desde el propio sitio.

## Despliegue en Cloudflare Pages

Al conectar este repositorio mediante la integración Git de Pages, usa la rama `main`, el comando de compilación `pnpm build` y el directorio de salida `dist`. La raíz del proyecto es la raíz del repositorio.

Pages publica los archivos generados después de compilar. Si el panel muestra un campo **Deploy command** con `npx wrangler deploy`, estás configurando Workers: ese comando activa la configuración automática de Vite para Workers, en lugar del flujo de Pages.

El proyecto usa pnpm 11. Los scripts de instalación de `esbuild` y `workerd` están autorizados explícitamente en `pnpm-workspace.yaml` para que las herramientas de Cloudflare puedan instalarse sin la pregunta interactiva de `pnpm approve-builds`.

Referencias: [Vue en Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vue-site/), [configuración de Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/) y [permisos de scripts en pnpm](https://pnpm.io/settings/build#allowbuilds).

## Cambiar las recomendaciones

Edita `src/data/recommendations.ts`: ahí están los modelos, las cinco tareas, las tres opciones de presupuesto y la fecha de la selección editorial. Los modelos son los indicados para esta versión, no un ranking consultado en tiempo real. Si una tarea no tiene una elección específica para un presupuesto, se conserva su opción equilibrada. Luna 6.1 siempre muestra MAX effort.

La interfaz recuerda presupuesto y sonido en el navegador. Los sonidos son notas cortas generadas con Web Audio y están desactivados inicialmente. La web sigue funcionando si el navegador no permite almacenamiento, sonido o portapapeles. Incluye navegación por teclado, diálogo con foco contenido y soporte de movimiento reducido.

## Mascotas de los modelos

Las tarjetas y el diálogo muestran una mascota según el modelo recomendado, y la actualizan al cambiar de presupuesto. Los dibujos son SVG locales en `src/components/ModelMascot.vue`: Clawd para Claude, una estrella orbital para Astra, un sol para Sol y una luna para Luna. Las animaciones respetan la preferencia de movimiento reducido.
