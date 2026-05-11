import { cn } from '@/lib/cn'

export function navigationSplitRootClass({ className }: { className?: string }) {
	return cn('flex h-full min-h-0 w-full flex-1', className)
}
