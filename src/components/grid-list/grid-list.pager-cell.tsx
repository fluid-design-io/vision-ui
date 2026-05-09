import { motion, useTransform } from 'framer-motion'
import { getAttractionEffect } from './grid-list.utils'
import type { GridListItem, GridListPagerCellProps } from './grid-list.types'

export function GridListPagerCell<T extends GridListItem>({
	item,
	index,
	pageIndex,
	renderCell,
	rowIndex,
	colIndex,
	itemsPerPage,
	topBottomRowCols,
	middleRowCols,
	itemSize,
	gutter,
	verticalSpacing,
	scrollX,
	pageWidth,
	pageOffset,
	tappingIndex,
	setTappingIndex,
}: GridListPagerCellProps<T>) {
	const isFirstPage = pageIndex === 0
	const isTapping = tappingIndex === index
	const attractionEffect = getAttractionEffect(
		index,
		tappingIndex,
		itemsPerPage,
		topBottomRowCols,
		middleRowCols,
	)

	const cellX =
		rowIndex !== 1
			? colIndex * (itemSize + gutter) + (itemSize + gutter) / 2
			: colIndex * (itemSize + gutter)
	const cellY = rowIndex * (itemSize * verticalSpacing)

	const centerCol = Math.floor(middleRowCols / 2)
	const distance = Math.abs(rowIndex - 1) + Math.abs(colIndex - centerCol)
	const revealDelay = isFirstPage ? 0.1 + distance * 0.08 : 0

	const centerX = ((middleRowCols - 1) * (itemSize + gutter)) / 2
	const centerY = itemSize * verticalSpacing

	const middleRowParallax = useTransform(
		scrollX,
		[-pageOffset - pageWidth, -pageOffset, -pageOffset + pageWidth],
		[-itemSize * 1.5, 0, itemSize * 1.5],
	)

	const cellAbsoluteX = pageOffset + cellX
	const cellScreenX = useTransform(scrollX, (value) => value + cellAbsoluteX)
	const inputRange = [-itemSize, 0, pageWidth - itemSize, pageWidth]
	const scrollScale = useTransform(cellScreenX, inputRange, [0.6, 1, 1, 0.6], { clamp: true })
	const scrollOpacity = useTransform(cellScreenX, inputRange, [0, 1, 1, 0], { clamp: true })
	const scrollFilter = useTransform(
		cellScreenX,
		inputRange,
		['blur(16px)', 'blur(0px)', 'blur(0px)', 'blur(16px)'],
		{ clamp: true },
	)

	return (
		<motion.div
			layout
			style={{
				position: 'absolute',
				left: cellX,
				top: cellY,
				width: itemSize,
				height: itemSize,
				x: rowIndex === 1 ? middleRowParallax : 0,
				scale: scrollScale,
				opacity: scrollOpacity,
				filter: scrollFilter,
			}}
			initial={
				isFirstPage
					? {
							x: (centerX - cellX) * 0.5,
							y: (centerY - cellY) * 0.5,
							opacity: 0,
							scale: 0.5,
						}
					: undefined
			}
			animate={
				isFirstPage
					? {
							x: 0,
							y: 0,
							opacity: 1,
							scale: 1,
						}
					: undefined
			}
			transition={{ type: 'spring', damping: 18, stiffness: 90, delay: revealDelay }}
			onMouseDown={() => setTappingIndex(index)}
			onMouseUp={() => setTappingIndex(null)}
			onMouseLeave={() => setTappingIndex(null)}
		>
			<motion.div
				className="h-full w-full"
				animate={{
					scale: isTapping ? 0.9 : attractionEffect.isAffected ? 0.98 : 1,
					x: attractionEffect.shiftX,
					y: attractionEffect.shiftY,
				}}
				transition={{ type: 'spring', bounce: 0 }}
			>
				{renderCell({
					item,
					rowIndex,
					colIndex,
					isTapping,
				})}
			</motion.div>
		</motion.div>
	)
}
