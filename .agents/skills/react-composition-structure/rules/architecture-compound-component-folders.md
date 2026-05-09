## Use Compound Component Folders for Shared Multi-Part UI

Use a compound component folder when a shared component has multiple named
subparts, shared sibling state, or variants that would otherwise become boolean
props.

**Bad (bag of sibling files and leaked state):**

```text
components/
  Composer.tsx
  ComposerHeader.tsx
  ComposerFooter.tsx
  ComposerInput.tsx
  useComposerState.ts
```

```tsx
function ComposerInput() {
  const { input, setInput } = useChannelComposerState()
  return <TextInput value={input} onChangeText={setInput} />
}
```

The public surface is fragmented and the UI is coupled to one state
implementation.

**Good (one folder, one namespace, provider-led sharing):**

```text
composer/
  composer.tsx
  composer.context.tsx
  composer.display.tsx
  composer.actions.tsx
  composer.types.ts
  index.ts
```

```tsx
type ComposerContextValue = {
  state: ComposerState
  actions: ComposerActions
  meta: ComposerMeta
}

const ComposerContext = createContext<ComposerContextValue | null>(null)

function ComposerInput() {
  const {
    state,
    actions: { updateInput },
    meta: { inputRef },
  } = use(ComposerContext)

  return (
    <TextInput
      ref={inputRef}
      value={state.input}
      onChangeText={updateInput}
    />
  )
}
```

Put responsibilities in these files:

- `<component>.tsx`: assemble the compound namespace
- `<component>.context.tsx`: own provider wiring and safe context access
- `<component>.display.tsx`: own read-oriented leaves
- `<component>.actions.tsx`: own interactive leaves
- `<component>.types.ts`: own the shared `state/actions/meta` contract
- `index.ts`: export the root only

**State-sharing rule:** the provider boundary, not visual nesting, determines
who can read shared state. A preview pane or dialog action can live outside the
main frame and still consume the same context if it stays inside the provider.

**Use this rule for:**

- reusable card-like components
- shared forms or composer-style UI
- compound components with display and action surfaces

**Do not use this rule for:**

- small leaf components
- modules that do not share state or composition across siblings

Folder location (`components/` vs `features/`) is orthogonal: the same file
shapes apply in either tree.

A module may own both a shared compound namespace and route-bound screens when
the shared surface genuinely belongs to the same domain. Keep the compound
namespace narrow (leaves only — no screens) and expose screens as top-level
exports per `architecture-feature-module-folders.md`.
