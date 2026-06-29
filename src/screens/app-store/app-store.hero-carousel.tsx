'use client'

import { Button } from '@/components/button'
import { useScroll } from '@/components/scrollview'
import { cn } from '@/lib/cn'
import { motion, MotionStyle, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import { HIDE_SCROLLBAR } from './app-store.primitives'
import type { HeroSlide } from './app-store.types'

/** Soft decorative orbs layered over gradient (image-less) slides. */
function SlideArtwork() {
	return (
		<div aria-hidden className="absolute inset-0 overflow-hidden">
			<div className="absolute top-6 -right-10 size-56 rounded-full bg-white/25 blur-2xl" />
			<div className="absolute right-24 bottom-2 size-40 rounded-full bg-white/15 blur-3xl" />
			<div className="absolute top-1/3 right-10 size-28 rotate-12 rounded-3xl bg-white/20 blur-xl" />
		</div>
	)
}

function HeroSlide({ slide }: { slide: HeroSlide }) {
	return (
		<div className="relative isolate h-full w-full shrink-0 snap-start snap-always overflow-hidden pb-[calc(var(--hero-carousel-height,0px)/6)]">
			{slide.image ? (
				<img
					src={slide.image}
					alt=""
					decoding="async"
					className="absolute inset-0 h-full w-full object-cover"
					style={{ objectPosition: slide.objectPosition ?? 'center' }}
				/>
			) : (
				<div className="absolute inset-0" style={{ backgroundImage: slide.gradient }} />
			)}
			{slide.image ? null : <SlideArtwork />}
			<div className="absolute inset-y-0 left-0 w-[80%] bg-linear-to-r from-black/65 via-black/30 to-transparent" />
			<div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/45 to-transparent" />
			<div className="relative z-10 flex h-full max-w-[62%] flex-col justify-center gap-4 ps-12 pe-6 pt-(--stack-header-min,4rem) pb-12">
				<span className="text-xs font-semibold tracking-[0.2em] text-white/85 uppercase text-shadow-md">
					{slide.eyebrow}
				</span>
				<h1 className="text-[2.6rem] leading-[1.04] font-bold whitespace-pre-line text-white text-shadow-lg">
					{slide.title}
				</h1>
				{slide.subtitle ? (
					<p className="max-w-md text-[15px] text-white/85 text-shadow-md">{slide.subtitle}</p>
				) : null}
				<div className="mt-1">
					<Button className="rounded-full backdrop-blur-md">{slide.cta}</Button>
				</div>
			</div>
		</div>
	)
}

/** Swipeable, scroll-snapping hero with a paging dot indicator. */
export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
	const scrollViewRef = useRef<HTMLDivElement>(null)
	const { scrollY, containerDimensions } = useScroll()
	const [active, setActive] = useState(0)

	const handleScroll = () => {
		const el = scrollViewRef.current
		const width = el?.clientWidth

		if (!width) return
		setActive(Math.round(el.scrollLeft / width))
	}

	const goTo = (index: number) => {
		const el = scrollViewRef.current
		if (!el) return
		el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' })
	}

	// Hide the hero carousel when the user scrolls down
	const isHidden = useTransform(scrollY, [0, 80, 200], [1, 1, 0])

	return (
		<motion.div
			style={
				{
					opacity: isHidden,
					'--hero-carousel-height': `${containerDimensions.height}px`,
					'--hero-carousel-width': `${containerDimensions.width}px`,
					marginBottom: `${-containerDimensions.height / 4}px`,
				} as MotionStyle
			}
			className="sticky top-0 h-(--hero-carousel-height,clamp(280px,67dvh,640px)) w-(--hero-carousel-width,100%)"
		>
			<div
				ref={scrollViewRef}
				onScroll={handleScroll}
				className={cn(
					'flex h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden',
					HIDE_SCROLLBAR,
				)}
			>
				{slides.map((slide) => (
					<HeroSlide key={slide.id} slide={slide} />
				))}
			</div>
			<div className="pointer-events-none absolute inset-x-0 bottom-3.5 z-20 flex justify-center gap-1.5">
				{slides.map((slide, index) => (
					<button
						key={slide.id}
						type="button"
						aria-label={`Go to slide ${index + 1}`}
						onClick={() => goTo(index)}
						className={cn(
							'pointer-events-auto h-1.5 rounded-full transition-all duration-300',
							index === active ? 'w-5 bg-white' : 'w-1.5 bg-white/45 hover:bg-white/70',
						)}
					/>
				))}
			</div>
		</motion.div>
	)
}
