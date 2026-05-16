import { animate, motion, useMotionValue } from 'framer-motion'
import type { PanInfo } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useWindowSize } from './grid-list.hooks'
import { GridListPageIndicator } from './grid-list.page-indicator'
import { GridListPager } from './grid-list.pager'
import type { GridListItem, GridListProps } from './grid-list.types'

export const GridList = <T extends GridListItem>({
	items,
	renderCell,
	itemSize = 100,
	gutter = 48,
	verticalSpacing = 1.4,
}: GridListProps<T>) => {
	const { width } = useWindowSize()
	const scrollX = useMotionValue(0)
	const [tappingIndex, setTappingIndex] = useState<number | null>(null)
	const [isGridListReady, setIsGridListReady] = useState(false)

	const middleRowCols =
		width > 0 ? Math.max(3, Math.min(Math.floor((width * 0.8) / (itemSize + gutter)), 5)) : 3
	const topBottomRowCols = middleRowCols - 1
	const itemsPerPage = topBottomRowCols + middleRowCols + topBottomRowCols

	const pageWidth = middleRowCols * (itemSize + gutter) - gutter
	const totalHeight = itemSize * 2 * verticalSpacing + itemSize

	useEffect(() => {
		if (width > 0) {
			setIsGridListReady(true)
		}
	}, [width])

	const pages: T[][] = []
	for (let i = 0; i < items.length; i += itemsPerPage) {
		pages.push(items.slice(i, i + itemsPerPage))
	}

	const onDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
		const velocity = info.velocity.x
		const currentPage = -scrollX.get() / pageWidth
		let targetPage =
			Math.abs(velocity) > 300
				? velocity > 0
					? Math.floor(currentPage)
					: Math.ceil(currentPage)
				: Math.round(currentPage)

		targetPage = Math.max(0, Math.min(pages.length - 1, targetPage))
		animate(scrollX, -targetPage * pageWidth, { type: 'spring', damping: 25, stiffness: 200 })
	}

	return (
		// <div className="flex" onMouseUp={() => setTappingIndex(null)} data-slot="grid-list-root">
		<>
			<div
				style={{ width: pageWidth, height: totalHeight }}
				onMouseUp={() => setTappingIndex(null)}
			>
				<motion.div
					className="relative flex"
					style={{ x: scrollX, width: pages.length * pageWidth, height: totalHeight }}
					drag="x"
					dragConstraints={{ left: -(pages.length - 1) * pageWidth, right: 0 }}
					dragTransition={{ bounceStiffness: 600, bounceDamping: 80 }}
					onDragEnd={onDragEnd}
					data-slot="grid-list-root"
				>
					{isGridListReady &&
						pages.map((pageItems, i) => (
							<GridListPager
								key={`page-${i}`}
								pageIndex={i}
								items={pageItems}
								renderCell={renderCell}
								itemSize={itemSize}
								gutter={gutter}
								verticalSpacing={verticalSpacing}
								scrollX={scrollX}
								pageWidth={pageWidth}
								itemsPerPage={itemsPerPage}
								topBottomRowCols={topBottomRowCols}
								middleRowCols={middleRowCols}
								tappingIndex={tappingIndex}
								setTappingIndex={setTappingIndex}
							/>
						))}
				</motion.div>
			</div>
			{isGridListReady && pages.length > 1 && (
				<div className="-translate-x-1/2 -bottom-12 absolute left-1/2 flex space-x-2">
					{pages.map((_, i) => (
						<GridListPageIndicator key={i} pageIndex={i} scrollX={scrollX} pageWidth={pageWidth} />
					))}
				</div>
			)}
		</>
		// </div>
	)
}
