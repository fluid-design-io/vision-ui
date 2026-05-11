'use client'

import { useRender } from '@base-ui/react/use-render'

import { sidebarItemClass } from './sidebar.styles'
import type { SidebarItemProps } from './sidebar.types'

export function SidebarItem({ render, isActive, className, children }: SidebarItemProps) {
	return useRender({
		defaultTagName: 'button',
		render,
		props: {
			type: 'button',
			className: sidebarItemClass({ active: isActive, className }),
			children,
		},
	})
}
