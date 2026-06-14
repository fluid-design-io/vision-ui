# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2026-06-14

### Changed

- **BREAKING:** Unified `WindowControl` into a single `Window` namespace. Removed the `@/components/window-control` module — import from `@/components/window` instead. The control is now **`Window.Control`**, with **`Window.Control.Close`**, **`Window.Control.Grabber`**, **`Window.Control.Share`**, and **`Window.Control.Button`** as its parts.
- **`Window.Control` is now an absolute overlay by default** (`anchored`), centered just below the window and out of normal flow — it no longer affects the window's size or the surrounding layout, removing the per-usage height/constraint tuning the old flex-sibling required. New **`anchored`** prop opts out.

### Added

- **`Window`** component — frames a window (`Stack`, `NavigationSplitView`, `Surface`, …) and attaches its controls beneath it, providing the positioned anchor `Window.Control` needs. Composition-friendly: arbitrary children, with a custom `Window.Control` child replacing the default.
- `Window.Control` now fades in **together with the window**, riding the stack's `@starting-style` entrance (`src/styles/stack.scss`).
- `buttonTouchDown` sound; the Stack back button now plays it on activation.

### Fixed

- `settings.layout` migrated to `Window`, fixing the control's placement (it had been left on the old flex-sibling pattern, which the overlay change mis-anchored).

## [0.1.0] - 2026-06-14

First versioned release.

### Added

- **`SoundProvider`** — centralized owner of sound-effect playback, mounted at the app root. A single app-wide `SoundManager` plays one-shot effects through detached audio elements that it keeps alive until they finish, so effects are no longer tied to the lifecycle of the component that triggered them.
- **`useSoundEffect()`** hook — returns a fire-and-forget `play(source, options?)` backed by the provider. Preferred API for one-shot effects (clicks, toggles).
- **`WindowControl`** component — visionOS window chrome (grabber + hover-revealed close/share controls) composing `Cursor.Snap` and `PressableFeedback`, with a customizable animation API. Router-bound close via `onClose`.
- **`ActivityIndicator`** component — visionOS-style loading spinner with `sm`/`md`/`lg` sizes, a one-time intro spin, a looping opacity wave, and a customizable animation API.
- **`ListGroup.Item`** now accepts **`isSoundDisabled`**; the `disabled` state also silences the click sound automatically.

### Changed

- One-shot sound playback moved off the lifecycle-tied `useSound().play()` onto the provider-owned `SoundManager`. `useSound` is now scoped to controlled/looping audio (e.g. the home ambient); `playSoundEffect` (for non-component call sites such as list `renderItem` callbacks) delegates to the same manager.

### Fixed

- One-shot sounds were cut off when the triggering element unmounted on navigation — most visibly a `ListGroup.Item` rendered as a `<Link>` (e.g. Settings → About), whose `gridSelect` sound never played because the screen unmounted before the async `audio.play()` could start. Playback now survives the unmount.

[0.1.0]: https://github.com/
