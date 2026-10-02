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

## Cambiar las recomendaciones

Edita `src/data/recommendations.ts`: ahí están los modelos, las cinco tareas, las tres opciones de presupuesto y la fecha de la selección editorial. Los modelos son los indicados para esta versión, no un ranking consultado en tiempo real. Si una tarea no tiene una elección específica para un presupuesto, se conserva su opción equilibrada. Luna 6.1 siempre muestra MAX effort.

La interfaz recuerda presupuesto y sonido en el navegador. Los sonidos son notas cortas generadas con Web Audio y están desactivados inicialmente. La web sigue funcionando si el navegador no permite almacenamiento, sonido o portapapeles. Incluye navegación por teclado, diálogo con foco contenido y soporte de movimiento reducido.

## Mascotas de los modelos

Las tarjetas y el diálogo muestran una mascota según el modelo recomendado, y la actualizan al cambiar de presupuesto. Los dibujos son SVG locales en `src/components/ModelMascot.vue`: Clawd para Claude, una estrella orbital para Astra, un sol para Sol y una luna para Luna. Las animaciones respetan la preferencia de movimiento reducido.
