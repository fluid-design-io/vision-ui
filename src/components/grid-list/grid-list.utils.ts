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
