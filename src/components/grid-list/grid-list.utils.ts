/** Middle row index in the honeycomb layout (0 = top, 1 = center, 2 = bottom). */
export const CENTER_ROW_INDEX = 1

export function getCenterColumnIndex(middleRowCols: number) {
	return Math.floor(middleRowCols / 2)
}

export function getCellLayoutProps(
	index: number,
	itemsPerPage: number,
	topBottomRowCols: number,
	middleRowCols: number,
) {
	const pageIndex = Math.floor(index / itemsPerPage)
	const indexInPage = index % itemsPerPage

	let rowIndex: number
	let colIndex: number

	if (indexInPage < topBottomRowCols) {
		rowIndex = 0
		colIndex = indexInPage
	} else if (indexInPage < topBottomRowCols + middleRowCols) {
		rowIndex = 1
		colIndex = indexInPage - topBottomRowCols
	} else {
		rowIndex = 2
		colIndex = indexInPage - topBottomRowCols - middleRowCols
	}

	return { pageIndex, rowIndex, colIndex }
}

/**
 * Honeycomb distance from the visual center of the grid (middle row, center column).
 * Used for center-out stagger timing (grid-list.scss @starting-style and view transitions).
 */
export function getStaggerDistanceFromCenter(
	rowIndex: number,
	colIndex: number,
	middleRowCols: number,
) {
	const centerCol = getCenterColumnIndex(middleRowCols)

	if (rowIndex === CENTER_ROW_INDEX) {
		return Math.abs(colIndex - centerCol)
	}

	const adjacentCenterDistance = Math.min(
		Math.abs(colIndex - centerCol),
		Math.abs(colIndex - (centerCol - 1)),
	)

	return Math.abs(rowIndex - CENTER_ROW_INDEX) + adjacentCenterDistance
}

/** Matches $grid-cell-stagger-* in grid-list.scss */
export const STAGGER_BASE_DELAY_MS = 80
export const STAGGER_STEP_DELAY_MS = 80

export function getStaggerDelayMs(rowIndex: number, colIndex: number, middleRowCols: number) {
	const distance = getStaggerDistanceFromCenter(rowIndex, colIndex, middleRowCols)
	return STAGGER_BASE_DELAY_MS + distance * STAGGER_STEP_DELAY_MS
}

/**
 * Signed deltas from the grid center. `colDelta` maps to horizontal parallax (`--row-offset`),
 * `rowDelta` maps to vertical parallax (`--col-offset`) on the cell icon.
 */
export function getHoneycombParallaxOffset(
	rowIndex: number,
	colIndex: number,
	middleRowCols: number,
) {
	const centerCol = getCenterColumnIndex(middleRowCols)
	const colDelta = colIndex - centerCol
	const rowDelta = rowIndex - CENTER_ROW_INDEX

	const rowOffset = colDelta * 0.75
	const colOffset = rowDelta === -1 ? -2 : rowDelta === 1 ? 2 : -1

	return { colDelta, rowDelta, rowOffset, colOffset }
}

function formatDeltaClass(prefix: string, delta: number) {
	if (delta === 0) {
		return `${prefix}-0`
	}

	return delta < 0 ? `${prefix}-n${-delta}` : `${prefix}-p${delta}`
}

/** CSS variables for parallax + center-out stagger on [data-slot='grid-cell']. */
export function getGridCellStyle(rowIndex: number, colIndex: number, middleRowCols: number) {
	const { rowOffset, colOffset } = getHoneycombParallaxOffset(rowIndex, colIndex, middleRowCols)

	return {
		'--row-offset': `${rowOffset}px`,
		'--col-offset': `${colOffset}px`,
		'--stagger-delay': `${getStaggerDelayMs(rowIndex, colIndex, middleRowCols)}ms`,
	} as const
}

/**
 * Classes for view-transition snapshots. Custom properties on the live cell are not
 * copied onto ::view-transition-old/new, so stagger distance and parallax direction
 * are encoded as classes that grid-list.scss maps back to CSS variables.
 */
export function getGridCellViewTransitionClass(
	rowIndex: number,
	colIndex: number,
	middleRowCols: number,
) {
	const distance = getStaggerDistanceFromCenter(rowIndex, colIndex, middleRowCols)
	const { colDelta, rowDelta } = getHoneycombParallaxOffset(rowIndex, colIndex, middleRowCols)

	const colDeltaClass = formatDeltaClass('grid-cell-rx', Math.max(-4, Math.min(4, colDelta)))
	const rowDeltaClass = formatDeltaClass('grid-cell-ry', Math.max(-1, Math.min(1, rowDelta)))

	return `grid-cell grid-cell-stagger-${distance} ${colDeltaClass} ${rowDeltaClass}`
}

export function getAttractionEffect(
	index: number,
	tappingIndex: number | null,
	itemsPerPage: number,
	topBottomRowCols: number,
	middleRowCols: number,
) {
	if (tappingIndex === null || index === tappingIndex) {
		return { isAffected: false, intensity: 0, shiftX: 0, shiftY: 0 }
	}

	const props = getCellLayoutProps(index, itemsPerPage, topBottomRowCols, middleRowCols)
	const tappedProps = getCellLayoutProps(
		tappingIndex,
		itemsPerPage,
		topBottomRowCols,
		middleRowCols,
	)

	if (props.pageIndex !== tappedProps.pageIndex) {
		return { isAffected: false, intensity: 0, shiftX: 0, shiftY: 0 }
	}

	const deltaX = tappedProps.colIndex - props.colIndex
	const deltaY = tappedProps.rowIndex - props.rowIndex
	const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

	const maxDistance = 3
	if (distance > maxDistance || distance === 0) {
		return { isAffected: false, intensity: 0, shiftX: 0, shiftY: 0 }
	}

	const intensity = Math.max(0, 1 - distance / maxDistance)

	const maxShift = 10
	const shiftAmount = intensity * maxShift

	const shiftX = distance > 0 ? (deltaX / distance) * shiftAmount : 0
	const shiftY = distance > 0 ? (deltaY / distance) * shiftAmount : 0

	return { isAffected: true, intensity, shiftX, shiftY }
}
