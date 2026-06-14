export { Window } from './window'
export type { WindowOwnProps, WindowProps, WindowRootProps } from './window.types'

export {
	resolveWindowControlAnimation,
	WINDOW_CONTROL_DEFAULT_GRABBER_HOVER_OPACITY,
	WINDOW_CONTROL_DEFAULT_GRABBER_REST_OPACITY,
	WINDOW_CONTROL_DEFAULT_GRABBER_SHRINK_SCALE,
	WINDOW_CONTROL_DEFAULT_GRABBER_TRANSITION,
	WINDOW_CONTROL_DEFAULT_HIDDEN_OPACITY,
	WINDOW_CONTROL_DEFAULT_HIDDEN_SCALE,
	WINDOW_CONTROL_DEFAULT_REVEAL_TRANSITION,
} from './window.control.animation'
export type { WindowControlSide } from './window.control.context'
export {
	windowControlButtonVariants,
	windowControlGrabberVariants,
	windowControlSlotVariants,
	windowControlVariants,
} from './window.control.styles'
export type {
	WindowControlAnimation,
	WindowControlButtonOwnProps,
	WindowControlButtonProps,
	WindowControlGrabberAnimation,
	WindowControlGrabberProps,
	WindowControlProps,
	WindowControlRevealAnimation,
	WindowControlRootOwnProps,
	WindowControlRootProps,
	WindowControlSlotOwnProps,
	WindowControlSlotProps,
} from './window.control.types'
