![Landing](https://github.com/user-attachments/assets/28bc4489-d308-4cc6-ba20-b83d4ee6c473)

# Vision UI

> VisionOS-inspired UI kit and demo app — built with **TanStack Start**, **Motion**, and **CSS**.

**[Live demo](https://vision.uing.dev)** · **[Docs](https://vision.uing.dev/docs)** · **[Architecture](./architecture.md)**

![Ornament](https://github.com/user-attachments/assets/8473d636-9eff-4de7-9224-6a306e3ed344)

---

## What is Vision UI?

Vision UI brings visionOS-like depth, glass, and spatial motion to the web with modern CSS — View Transitions, `@starting-style`, and pseudo-element highlights — plus composable and accessible React components. Motion handles gestures; route-shaped transition types handle the rest; modern API documentation (powered by [Fumadocs](https://fumadocs.dev/)) is built-in.


## What makes the UI tick

### 1. Route-shaped view transitions

`src/router.tsx` inspects `from` / `to` paths and returns **view transition types** — not animation code:

- **`home-app-launch`** — `/` ↔ any in-app route (Settings, App Store, …)
- **`ornament-tab-switch`** — `/` ↔ `/people` ↔ `/environments`

CSS listens with `:active-view-transition-type(...)` and picks keyframes. Add a new app route under `(apps)/` and it automatically gets the launch transition; no per-route React animation tree.

### 2. One grid cell, three lifecycles

Every honeycomb tile uses `data-slot="grid-cell"` and shared helpers in `grid-list.utils.ts`:

| Moment | Mechanism |
|--------|-----------|
| First visit | `@starting-style` + `--stagger-delay` (center-out ripple) |
| Open / close app | `::view-transition-old/new(.grid-cell)` + `grid-cell-exit` / `grid-cell-enter` |
| Home / People / Environments tabs | Lighter `grid-cell-tab-switch-*` keyframes |

Stagger distance is **Manhattan distance from the middle row’s center column** — one function, same timing in CSS and (where needed) JS.

### 3. `Surface` — glass without assets

`Surface` composes **backdrop blur, inset highlights, and mask strokes** from `surface.styles.ts`. Thickness is a variant (`thin` → `thickest`), not seven hand-tuned components. Highlights are CSS variables and pseudo-elements, not image slices or svgs.

### 4. Compound components, thin routes

**Ornament** (shell + tabs), **Stack** (app chrome), **GridList** (honeycomb pager), **Cursor**, **PressableFeedback** — each exposes one namespace from `index.ts`. Routes in `src/routes/` stay wrappers; screens in `src/screens/` own layout and cell renderers.

See **[architecture.md](./architecture.md)** for folder rules, agent checklists.

---

## Project layout

```text
src/
  routes/           # TanStack file routes (thin)
  screens/          # Feature UI (home, people, settings, …)
  components/       # Shared compound components
  styles/           # Sass: grid-list.scss (cells), apps.scss, stack.css, …
  lib/              # Sound, docs source, shared helpers
  router.tsx        # View transition types from path shape
```

---

## Develop

```bash
bun install
bun run dev
```

---

## Screenshots

![Environments](https://github.com/user-attachments/assets/fb692f7b-4935-4e93-9f86-0ea8665eaeef)

![Demo](https://github.com/user-attachments/assets/cd924064-d927-47ef-919e-9d169f67c7c9)

---

## Learn more

- **[architecture.md](./architecture.md)** — composition, view transitions, and agent workflow
- **In-repo docs** — `https://vision.uing.dev/docs` (component MDX under `content/docs/`)