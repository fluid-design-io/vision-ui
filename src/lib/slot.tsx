import * as React from 'react'
import { cloneElement, isValidElement } from 'react'
import { cn } from '@/lib/cn'

type AnyProps = Record<string, unknown>

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
	return (node: T) => {
		for (const ref of refs) {
			if (ref == null) continue
			if (typeof ref === 'function') ref(node)
			else (ref as React.MutableRefObject<T | null>).current = node
		}
	}
}

/**
 * When `asChild` is true, merge props onto the single child element instead of
 * rendering a default DOM element.
 */
export function mergeSlotProps<T extends AnyProps>(
	child: React.ReactElement<T>,
	slotProps: T & AnyProps,
): React.ReactElement<T> {
	const { ref: slotRef, ...rest } = slotProps as T & { ref?: React.Ref<unknown> }
	const childProps = child.props as AnyProps
	const mergedClassName = cn(
		typeof rest.className === 'string' ? rest.className : undefined,
		typeof childProps.className === 'string' ? childProps.className : undefined,
	)
	const mergedStyle = {
		...(typeof childProps.style === 'object' && childProps.style ? childProps.style : {}),
		...(typeof rest.style === 'object' && rest.style ? rest.style : {}),
	}

	return cloneElement(child, {
		...childProps,
		...rest,
		className: mergedClassName || undefined,
		style: Object.keys(mergedStyle).length ? mergedStyle : undefined,
		ref: mergeRefs(
			slotRef as React.Ref<unknown>,
			(child as React.ReactElement & { ref?: React.Ref<unknown> }).ref,
		),
	} as unknown as T)
}

export function SlotRoot({
	asChild,
	children,
	defaultTag: Tag = 'div',
	...props
}: React.PropsWithChildren<
	AnyProps & {
		asChild?: boolean
		defaultTag?: keyof React.JSX.IntrinsicElements
	}
>) {
	if (asChild) {
		const child = React.Children.only(children)
		if (!isValidElement(child)) {
			throw new Error('Slot: asChild expects a single React element child.')
		}
		return mergeSlotProps(child as React.ReactElement<AnyProps>, props as AnyProps)
	}
	return React.createElement(Tag as 'div', props as React.HTMLAttributes<HTMLDivElement>, children)
}
