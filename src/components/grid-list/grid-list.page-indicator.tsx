import { motion, useTransform } from 'framer-motion'
import type { GridListPageIndicatorProps } from './grid-list.types'

export function GridListPageIndicator({
	pageIndex,
	scrollX,
	pageWidth,
}: GridListPageIndicatorProps) {
	const pageProgress = useTransform(scrollX, (value) => {
		const distance = Math.abs(pageIndex + value / pageWidth)
		return Math.max(1 - distance * 0.5, 0.4)
	})
	return <motion.div className="h-2 w-2 rounded-full bg-white" style={{ opacity: pageProgress }} />
}
