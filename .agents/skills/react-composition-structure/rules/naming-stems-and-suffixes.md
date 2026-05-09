## Keep One Stem and Use Responsibility-Driven Suffixes

Within one module, repeat one clear stem and use suffixes to communicate file
responsibility.

**Bad (mixed naming systems):**

```text
checkout/
  index.tsx
  useCheckout.ts
  CheckoutScreen.tsx
  helpers.ts
  types.ts
```

**Good (one stem, explicit roles):**

```text
checkout/
  checkout.tsx
  checkout.screen.tsx
  checkout.data.ts
  checkout.summary.tsx
  checkout.types.ts
  index.ts
```

**Per-folder reset:** The stem rule applies per folder boundary. A nested folder
(see `organization-nest-when-prefix-repeats.md`) resets the stem to the folder's
own name: `checkout/billing/billing.form.tsx` is correct;
`checkout/billing/checkout.billing.form.tsx` is not.

Useful suffixes:

- `.screen.tsx`
- `.page.tsx`
- `.data.ts`
- `.types.ts`
- `.context.tsx`
- `.display.tsx`
- `.actions.tsx`
- `.utils.ts`
- `.constants.ts`
- `.md`

Prefer consistency over novelty. If a mature repo already uses PascalCase files
or another coherent convention, preserve that system and translate the structure
instead of mixing styles.
