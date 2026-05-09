## Use Feature Folders for Route-Bound UI

Use a feature folder when a page or screen owns enough local complexity that
colocation improves clarity.

**Bad (feature scattered across unrelated files):**

```text
checkout.tsx
useCheckout.ts
CheckoutList.tsx
CheckoutSummary.tsx
types.ts
helpers.ts
```

**Good (one feature folder with thin route wiring):**

```text
checkout/
  checkout.tsx
  checkout.screen.tsx
  checkout.data.ts
  checkout.list.tsx
  checkout.summary.tsx
  checkout.types.ts
  index.ts
```

Put responsibilities in these files:

- `<feature>.tsx`: assemble the public namespace when the feature exposes a
  compound surface (2+ leaves, or 1 leaf plus shared state). A feature that
  only exposes screens and a single leaf can skip `<feature>.tsx` and export
  directly from `index.ts`.
- `<feature>.screen.tsx` or `<feature>.page.tsx`: own route-facing UI
- `<feature>.data.ts`: own feature-local orchestration
- leaf files such as `.list.tsx`, `.summary.tsx`, `.form.tsx`: own internal sections
- `index.ts`: owns the public boundary (feature root by default; top-level
  screen exports when a feature has two or more route surfaces — see
  **Multi-screen feature modules** below)

**Bad (route owns feature orchestration):**

```tsx
export default function CheckoutRoute() {
  const { cart, submitOrder } = useCheckout()
  return <CheckoutList cart={cart} onSubmit={submitOrder} />
}
```

**Good (route stays thin):**

```tsx
import { Checkout } from "@/features/checkout"

export default function CheckoutRoute() {
  return <Checkout.Screen />
}
```

**Multi-screen feature modules**

When a feature has two or more route surfaces, export each screen as a
top-level symbol from `index.ts` instead of namespacing them under the feature
root. Keep the feature namespace reserved for genuinely shared compound leaves
(for example `Faculty.Avatar`). A feature with exactly one screen may still use
`Feature.Screen` for symmetry.

```text
faculty/
  faculty.tsx                // Faculty = { Avatar }
  faculty.directory.screen.tsx
  faculty.detail.screen.tsx
  faculty.avatar.tsx
  faculty.data.ts
  index.ts
```

```ts
export { Faculty } from "./faculty"
export { FacultyDirectoryScreen } from "./faculty.directory.screen"
export { FacultyDetailScreen } from "./faculty.detail.screen"
```

The set of exports should map to the set of intentional public entry points —
one root is the default, not a hard cap.

Keep `*.data.ts` for feature-owned queries, mutations, search state, and view
model shaping. Do not use it for generic infra or widely shared hooks.

When a subflow nests (organization rule: nest when filename prefixes repeat),
subflow-only data moves into the subflow's `*.data.ts`; see
`organization-colocate-internals.md`.

Use nested subfolders only when a feature contains real subflows with their own
screens, data modules, or reusable entry surfaces.
