# React Composition Structure

A structured repository for React and React Native file-system composition
patterns that scale. These patterns help teams express good component
architecture in folders, files, naming, and export boundaries instead of
letting structure drift into monolithic files or bag-of-exports modules.

## Install

```bash
npx skills add fluid-design-io/react-composition-structure
```

## Structure

- `rules/` - Individual rule files (one per rule)
  - `architecture-compound-component-folders.md` - Shared multi-part component folders
  - `architecture-feature-module-folders.md` - Route-bound feature folders
  - `boundaries-public-api.md` - Public export boundaries
  - `naming-stems-and-suffixes.md` - Naming conventions for module-owned files
- `SKILL.md` - Trigger metadata and quick reference
- `**AGENTS.md**` - Full compiled guide for agents

## Rules

### Component Folders (HIGH)

- `architecture-compound-component-folders.md` - Organize shared multi-part
components around one root namespace, provider-led state sharing, and clear
file ownership

### Feature Module Folders (HIGH)

- `architecture-feature-module-folders.md` - Organize pages and screens into
feature folders with thin route wrappers and colocated `*.data.ts`

### Public API Boundaries (MEDIUM)

- `boundaries-public-api.md` - Export one module root by default and keep
internal leaves private unless they are intentionally public

### Naming Stems and Suffixes (MEDIUM)

- `naming-stems-and-suffixes.md` - Keep one module stem, use explicit suffixes,
and preserve strong repo conventions instead of mixing naming systems

## Core Principles

1. **Structure should reflect composition** — If the UI is compound, the folder
  should make that obvious
2. **One module, one public root** — Export the namespace, not every internal leaf
3. **Colocate feature-owned orchestration** — Keep screen and page-specific
  `*.data.ts` close to the feature they serve
4. **Name by ownership and responsibility** — Reuse one stem and make file jobs
  obvious from their suffixes
5. **Preserve coherent repo conventions** — Adapt the structure to the codebase
  instead of forcing a second naming system

## Creating a New Rule

1. Create a new file in `rules/` using the appropriate prefix
2. Use one main concern per rule file
3. Include:
  - a short explanation of why the rule matters
  - bad and good examples
  - file trees or code snippets when helpful
  - practical exceptions or a checklist if the rule needs guardrails
4. Add the rule to `SKILL.md` so the quick reference stays current
5. Update `AGENTS.md` so the compiled guide reflects the new rule set

## Prefix Guide

- `architecture-` for folder shape and module organization
- `boundaries-` for public API and export rules
- `naming-` for file stems, suffixes, and naming consistency

## Impact Levels

- `HIGH` - Foundational structure patterns that prevent churn and unclear ownership
- `MEDIUM` - Patterns that improve maintainability, discoverability, and consistency

