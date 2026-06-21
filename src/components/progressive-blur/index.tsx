import { cn } from '@/lib/cn'

type ProgressiveBlurProps = {
	className?: string
	backgroundColor?: string
	position?: 'top' | 'bottom'
	height?: string
	blurAmount?: string
}

export function ProgressiveBlur({
	className,
	backgroundColor = 'var(--color-background)',
	position = 'top',
	height = '150px',
	blurAmount = '4px',
}: ProgressiveBlurProps) {
	const opposite = position === 'top' ? 'bottom' : 'top'

	return (
		<div
			className={cn('pointer-events-none absolute inset-x-0 select-none', className)}
			style={{
				[position]: 0,
				height,
				background: `linear-gradient(to ${position}, transparent, ${backgroundColor})`,
				maskImage: `linear-gradient(to ${opposite}, black 50%, transparent)`,
				WebkitBackdropFilter: `blur(${blurAmount})`,
				backdropFilter: `blur(${blurAmount})`,
			}}
		/>
	)
}
