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

export interface CursorRootProps extends React.HTMLAttributes<HTMLDivElement> {
	isDisabled?: boolean
}

export interface CursorSnapState extends Record<string, unknown> {
	active: boolean
	disabled: boolean
}

export interface CursorSnapProps extends React.HTMLAttributes<HTMLElement> {
	id?: string
	strength?: number
	isDisabled?: boolean
	render?: UseRenderRenderProp<CursorSnapState>
}

export interface CursorSnapContextValue {
	id: string
	x: MotionValue<number>
	y: MotionValue<number>
	isDisabled: boolean
}

export interface CursorSnapTargetState extends Record<string, unknown> {
	disabled: boolean
}

export interface CursorSnapTargetProps extends HTMLMotionProps<'div'> {
	factor?: number
	isDisabled?: boolean
	render?: UseRenderRenderProp<CursorSnapTargetState>
}

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

export interface CursorPointerProps extends HTMLMotionProps<'div'> {
	isDisabled?: boolean
	render?: React.ReactElement | CursorPointerRender
}
