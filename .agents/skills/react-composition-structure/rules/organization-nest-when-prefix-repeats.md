---
title: Nest Folders When Filename Prefixes Repeat
impact: MEDIUM
impactDescription: keeps composed features discoverable as they grow
tags: file-organization, structure, refactoring
---

## Nest Folders When Filename Prefixes Repeat

Composition produces many small files (`Feature.Header`, `Feature.List`,
`Feature.Footer`, utilities, data, types). A flat layout with repeated
prefixes quickly becomes hard to scan and expensive for both humans and agents
to navigate.

**Refactor trigger:** when 3+ files share the same prefix (e.g.
`feature.detail.*`), promote the prefix to a folder. The prefix is now implicit
from the path, and `index.ts` becomes the folder's public API boundary.

Keep a short sub-prefix on files inside the folder (`detail/detail.header.tsx`,
not `detail/header.tsx`). This preserves grep-ability — searches for
`detail.header` still resolve — and avoids dozens of ambiguous `header.tsx`
files floating around the repo.

**Incorrect (flat structure with repeated prefixes):**

```
features/
  feature.detail.header.tsx
  feature.detail.list.tsx
  feature.detail.footer.tsx
  feature.detail.utils.ts
  feature.detail.data.ts
  feature.detail.types.ts
  feature.detail.index.ts
  feature.list.tsx
  feature.data.ts
  feature.types.ts
```

Problems:

- Prefix is repeated in every filename
- `feature.detail.*` and `feature.*` blur together when sorted
- No clear public API — every file looks equally importable
- Hard to move the `detail` subtree to a new location

**Correct (nest once the prefix repeats):**

```
features/
  feature/
    detail/
      detail.header.tsx
      detail.list.tsx
      detail.footer.tsx
      detail.utils.ts
      detail.data.ts
      detail.types.ts
      index.ts          // public API for `detail`
    feature.list.tsx
    feature.data.ts
    feature.types.ts
    index.ts            // public API for `feature`
```

`index.ts` only re-exports what's meant to be consumed externally. Internals
(`detail.utils.ts`, `detail.data.ts`) stay private unless explicitly exported —
this is the file-system analogue of compound components: the folder *is* the
namespace.

**Naming stays mechanical:**

| File                              | Exports                          |
| --------------------------------- | -------------------------------- |
| `composer/composer.input.tsx`     | `ComposerInput`                  |
| `composer/composer.footer.tsx`    | `ComposerFooter`                 |
| `composer/index.ts`               | `Composer` (namespace object)    |

The file path maps 1:1 to the component name, so agents don't have to guess
where `Composer.Input` lives.

**When not to nest:**

- A folder with only 1–2 files is premature; keep it flat
- A single file used once elsewhere doesn't justify a folder
- Don't nest purely for aesthetic symmetry — wait for the 3+ prefix repeat

**Barrel caveat:** Subfolders may have a local `index.ts` only when they
represent a real subflow with its own public surface consumed by parent siblings
(the nested `detail/` example above is such a case). Otherwise, imports inside
the subfolder should reference files directly (`./detail.header`), and the
feature's root `index.ts` remains the sole public boundary.
