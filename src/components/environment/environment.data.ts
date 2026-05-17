import { Environment } from './environment.types'

export const HOME_ENVIRONMENT: Environment = {
	id: 'home-night',
	label: 'Home Night',
	icon: '/assets/environments/home-night-icon.avif',
	background: '/assets/environments/home-night-background.avif',
}

const data: Environment[] = [
	{
		id: 'jupiter',
		label: 'Jupiter',
		icon: '/assets/environments/jupiter-icon.webp',
		background: '/assets/environments/jupiter-background.webp',
		brightnessOffset: 'bg-black/6',
	},
	{
		id: 'saturn',
		label: 'Saturn',
		icon: '/assets/environments/saturn-icon.webp',
		background: '/assets/environments/saturn-background.webp',
		brightnessOffset: 'bg-black/6',
	},
	{
		id: 'yosemite',
		label: 'Yosemite',
		icon: '/assets/environments/yosemite-icon.webp',
		background: '/assets/environments/yosemite-background.webp',
		brightnessOffset: 'bg-black/10',
	},
	{
		id: 'joshua-tree',
		label: 'Joshua Tree',
		icon: '/assets/environments/joshua-tree-icon.webp',
		background: '/assets/environments/joshua-tree-background.webp',
		brightnessOffset: 'bg-black/15',
	},
	{
		id: 'the-moon',
		label: 'The Moon',
		icon: '/assets/environments/the-moon-icon.webp',
		background: '/assets/environments/the-moon-background.webp',
		brightnessOffset: 'bg-black/0',
	},
	{
		id: 'mount-hood',
		label: 'Mount Hood',
		icon: '/assets/environments/mount-hood-icon.webp',
		background: '/assets/environments/mount-hood-background.webp',
		brightnessOffset: 'bg-black/0',
	},
	{
		id: 'lake-vrangla',
		label: 'Lake Vrangla',
		icon: '/assets/environments/lake-vrangla-icon.webp',
		background: '/assets/environments/lake-vrangla-background.webp',
		brightnessOffset: 'bg-black/5',
	},
	{
		id: 'white-sands',
		label: 'White Sands',
		icon: '/assets/environments/white-sands-icon.webp',
		background: '/assets/environments/white-sands-background.webp',
	},
	{
		id: 'bora-bora',
		label: 'Bora Bora',
		icon: '/assets/environments/bora-bora-icon.webp',
		background: '/assets/environments/bora-bora-background.webp',
		brightnessOffset: 'bg-black/15',
	},
	{
		id: 'haleakala',
		label: 'Haleakala',
		icon: '/assets/environments/haleakala-icon.webp',
		background: '/assets/environments/haleakala-background.webp',
		brightnessOffset: 'bg-black/20',
	},
]

export default data
