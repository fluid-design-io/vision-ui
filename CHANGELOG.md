# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
