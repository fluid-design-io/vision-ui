import type { MotionValue } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Basic constraint for items passed to the list.
 * They must have a unique 'id'.
 */
export interface GridListItem {
	id: string | number
}

/**
 * Information object passed to the `renderCell` function.
 */
export interface ListRenderItemInfo<T> {
	/** The item from the `items` array. */
	item: T
	/** True if the cell is currently being pressed down. */
	isTapping: boolean
	/** The row index of the cell. */
	rowIndex: number
	/** The column index of the cell. */
	colIndex: number
}

/**
 * Props for the main GridList component.
 */
export interface GridListProps<T extends GridListItem> {
	/** An array of data items to render. */
	items: T[]
	/**
	 * A function that returns a React element to render for a given item.
	 * @param info - An object containing the item, index, and interaction states.
	 * @returns A React.ReactNode to display.
	 */
	renderCell: (info: ListRenderItemInfo<T>) => ReactNode
	/**
	 * The diameter of each cell in pixels.
	 * @default 100
	 */
	itemSize?: number
	/**
	 * The space between each cell in pixels.
	 * @default 48
	 */
	gutter?: number
	/**
	 * The vertical spacing factor between rows.
	 * @default 1.4
	 */
	verticalSpacing?: number
}

export interface GridListPageIndicatorProps {
	pageIndex: number
	scrollX: MotionValue<number>
	pageWidth: number
}

export interface GridListPagerCellProps<T extends GridListItem> {
	item: T
	index: number
	pageIndex: number
	renderCell: (info: ListRenderItemInfo<T>) => ReactNode
	rowIndex: number
	colIndex: number
	itemsPerPage: number
	topBottomRowCols: number
	middleRowCols: number
	itemSize: number
	gutter: number
	verticalSpacing: number
	scrollX: MotionValue<number>
	pageWidth: number
	pageOffset: number
	tappingIndex: number | null
	setTappingIndex: (index: number | null) => void
}

export interface GridListPagerProps<T extends GridListItem> {
	items: T[]
	pageIndex: number
	renderCell: (info: ListRenderItemInfo<T>) => ReactNode
	itemSize: number
	gutter: number
	verticalSpacing: number
	scrollX: MotionValue<number>
	pageWidth: number
	itemsPerPage: number
	topBottomRowCols: number
	middleRowCols: number
	tappingIndex: number | null
	setTappingIndex: (index: number | null) => void
}
