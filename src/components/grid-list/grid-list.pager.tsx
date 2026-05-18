import { GridListPagerCell } from './grid-list.pager-cell'
import type { GridListItem, GridListPagerProps } from './grid-list.types'
import { getCellLayoutProps } from './grid-list.utils'

export function GridListPager<T extends GridListItem>(props: GridListPagerProps<T>) {
	const { items, pageIndex, itemsPerPage, topBottomRowCols, middleRowCols } = props
	const pageOffset = pageIndex * props.pageWidth

	return (
		<div className="absolute top-0 h-full" style={{ left: pageOffset, width: props.pageWidth }}>
			{items.map((item, i) => {
				const overallIndex = pageIndex * itemsPerPage + i
				const { rowIndex, colIndex } = getCellLayoutProps(
					overallIndex,
					itemsPerPage,
					topBottomRowCols,
					middleRowCols,
				)

				return (
					<GridListPagerCell
						key={item.id}
						item={item}
						index={overallIndex}
						{...props}
						{...{ rowIndex, colIndex, pageOffset }}
					/>
				)
			})}
		</div>
	)
}
