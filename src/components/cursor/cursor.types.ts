import type { UseRenderRenderProp } from '@base-ui/react/use-render'
import type { HTMLMotionProps, MotionValue } from 'motion/react'
import type * as React from 'react'

export interface CursorPoint {
	x: number
	y: number
}

export interface CursorParallax {
	x: number
	y: number
}

export interface CursorTargetFrame {
	id: string
	rect: DOMRect
	borderRadius: string
	parallax: CursorParallax
	pressed: boolean
}

export interface CursorSnapshot {
	isEnabled: boolean
	isInside: boolean
	isActive: boolean
	isPressed: boolean
	isSnapped: boolean
	activeTargetId: string | null
	pointerCount: number
}

export interface CursorSnapController {
	setParallax: (x: number, y: number) => void
	resetParallax: () => void
}

export interface CursorTargetRegistration {
	id: string
	seq: number
	element: HTMLElement
	strength: number
	isDisabled: boolean
	controller: CursorSnapController
}

export interface CursorContextValue {
	store: CursorStore
	cursorX: MotionValue<number>
	cursorY: MotionValue<number>
	cursorWidth: MotionValue<number>
	cursorHeight: MotionValue<number>
	cursorRadius: MotionValue<number>
	cursorOpacity: MotionValue<number>
	pointerScale: MotionValue<number>
	registerPointer: () => () => void
}

export interface CursorStore {
	getSnapshot: () => CursorSnapshot
	subscribe: (listener: () => void) => () => void
	getTargets: () => Iterable<CursorTargetRegistration>
	getTarget: (id: string) => CursorTargetRegistration | null
	registerTarget: (target: CursorTargetRegistration) => void
	updateTarget: (
		id: string,
		patch: Partial<Omit<CursorTargetRegistration, 'id' | 'seq' | 'element'>>,
	) => void
	unregisterTarget: (id: string) => void
	setEnabled: (isEnabled: boolean) => void
	setInside: (isInside: boolean) => void
	setPressed: (isPressed: boolean) => void
	setActiveTarget: (activeTargetId: string | null) => void
	setPointerCount: (pointerCount: number) => void
}

export interface CursorRootOwnProps {
	/** When true, the cursor system ignores pointer input. */
	isDisabled?: boolean
}

export interface CursorRootProps
	extends React.HTMLAttributes<HTMLDivElement>, CursorRootOwnProps {}

export interface CursorSnapState extends Record<string, unknown> {
	active: boolean
	disabled: boolean
}

export interface CursorSnapOwnProps {
	/** Optional stable id for this snap target. */
	id?: string
	/**
	 * How strongly the pointer lerps toward this target (0–1).
	 * @default 1
	 */
	strength?: number
	/** When true, this snap target is ignored. */
	isDisabled?: boolean
	/** Custom element or Base UI render function for the snap container. */
	render?: UseRenderRenderProp<CursorSnapState>
}

export interface CursorSnapProps
	extends React.HTMLAttributes<HTMLElement>, CursorSnapOwnProps {}

export interface CursorSnapContextValue {
	id: string
	x: MotionValue<number>
	y: MotionValue<number>
	isDisabled: boolean
}

export interface CursorSnapTargetState extends Record<string, unknown> {
	disabled: boolean
}

export interface CursorSnapTargetOwnProps {
	/**
	 * Parallax strength applied from the parent snap (0–1).
	 * @default 1
	 */
	factor?: number
	/** When true, parallax transforms are not applied. */
	isDisabled?: boolean
	/** Custom element or Base UI render function for the snap target child. */
	render?: UseRenderRenderProp<CursorSnapTargetState>
}

export interface CursorSnapTargetProps extends HTMLMotionProps<'div'>, CursorSnapTargetOwnProps {}

export type CursorPointerRenderState = CursorSnapshot & {
	x: MotionValue<number>
	y: MotionValue<number>
	width: MotionValue<number>
	height: MotionValue<number>
	radius: MotionValue<number>
	opacity: MotionValue<number>
	scale: MotionValue<number>
}

export type CursorPointerRender = (
	props: HTMLMotionProps<'div'>,
	state: CursorPointerRenderState,
) => React.ReactElement

export interface CursorPointerOwnProps {
	/** When true, the pointer visual is hidden and does not track input. */
	isDisabled?: boolean
	/** Custom pointer element or render function with geometry MotionValues. */
	render?: React.ReactElement | CursorPointerRender
}

export interface CursorPointerProps extends HTMLMotionProps<'div'>, CursorPointerOwnProps {}
