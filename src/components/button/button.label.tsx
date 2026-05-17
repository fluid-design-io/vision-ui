import { cn } from '@/lib/cn'
import { useRender } from '@base-ui/react/use-render'
import type { ButtonLabelProps } from './button.types'

export function ButtonLabel({ className, render, children }: ButtonLabelProps) {
	return useRender({
		defaultTagName: 'span',
		render,
		props: { className: cn('text-sm font-medium text-white/90', className), children },
	})
}
