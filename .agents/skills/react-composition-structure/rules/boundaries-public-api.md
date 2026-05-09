## Export One Module Root by Default

For shared component folders and feature folders, export one root symbol by
default. Keep internal leaves internal unless they are intentionally public.

**Bad (barrel leaks the whole implementation):**

```ts
export { CheckoutScreen } from "./checkout.screen"
export { CheckoutList } from "./checkout.list"
export { useCheckoutData } from "./checkout.data"
```

**Good (export only intentional public entry points):**

```ts
export { Checkout } from "./checkout"
```

```ts
export { Faculty } from "./faculty"
export { FacultyDirectoryScreen } from "./faculty.directory.screen"
export { FacultyDetailScreen } from "./faculty.detail.screen"
```

```ts
export { Composer } from "./composer"
```

This keeps callers stable while the inside of the folder evolves.

The rule is not "always exactly one export" — it is "exports match intentional
public entry points." One root is the default; screens become top-level
exports when a feature has two or more route surfaces (see
`architecture-feature-module-folders.md`).

Reasonable exceptions:

- documented public types
- explicitly reusable helpers
- test-only entrypoints kept in a separate testing boundary

If an exception exists, document it. Do not let barrels grow accidentally.
