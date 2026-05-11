import type * as React from 'react'

export interface SidebarRootProps {
	className?: string
	children: React.ReactNode
}

export interface SidebarHeaderProps {
	className?: string
	children: React.ReactNode
}

export interface SidebarSectionProps {
	title?: string
	className?: string
	children: React.ReactNode
}

export interface SidebarItemProps {
	asChild?: boolean
	isActive?: boolean
	className?: string
	children: React.ReactNode
}

export interface SidebarLabelProps {
	className?: string
	children: React.ReactNode
}

export interface SidebarIconProps {
	className?: string
	children: React.ReactNode
}
