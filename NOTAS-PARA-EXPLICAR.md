# Guía rápida para explicar el proyecto

**Qué hace:** busca cartas de Yu-Gi-Oh! por nombre y permite explorar la colección Blue-Eyes, sus impresiones y expansiones.

**Ángel — buscador:** `SearchComponent` recibe el texto. `debounceTime(400)` espera una pausa al escribir; `distinctUntilChanged()` evita repetir la misma búsqueda; `switchMap()` cancela la consulta anterior. `YugiohService.searchCards()` usa `fname` para coincidencias parciales. La API responde 400 cuando no encuentra cartas; ese caso se muestra como “Sin resultados”. Hay mensajes de carga y error.

**Adrián — colección:** `getBlueEyes()` consulta `archetype=Blue-Eyes`. Las expansiones se obtienen de `card_sets`, se eliminan duplicados y se filtran las cartas según la expansión elegida. `CardComponent` se reutiliza en ambos listados; `CardDetailComponent` presenta los datos e impresiones de la carta elegida.

**Datos que pueden faltar:** magia, trampa y monstruos Link no siempre tienen nivel, ATK o DEF. Se muestra “No aplica” cuando el campo no existe; un `0` sí es un valor válido. Las imágenes vienen en `card_images`.

**Imágenes:** se intentan guardar en la caché del navegador. El servidor de imágenes no permite descargarlas desde JavaScript por CORS; si ocurre, se muestran por su URL y el navegador usa su caché HTTP.

**Demostración:** buscar “Dark Magician” → abrir una carta → buscar un nombre inexistente → entrar a Blue-Eyes → abrir una carta → escoger una expansión → volver a “Todas”.

**Herramientas:** Angular organiza la pantalla en componentes; TypeScript define los tipos de carta; `HttpClient` pide datos a la API; RxJS controla las peticiones y sus estados. Git guarda el historial y GitHub permite unir el trabajo de ambos.

**Si preguntan por el código:** `startWith` muestra “Cargando”; `map` extrae `data`; `catchError` trata fallos. `shareReplay` reutiliza la consulta Blue-Eyes. `timeout(15000)` evita esperar indefinidamente y `takeUntilDestroyed` cancela la suscripción al salir. `new Set(names)` elimina expansiones repetidas y `some` comprueba si una carta aparece en la expansión elegida.

**Cambio rápido en vivo:** para mostrar la raza, añadir `race?: string` al modelo `Card` y mostrar `card.race` en tarjeta o detalle; el dato ya viene de la API.
