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
		icon: '/assets/environments/jupiter-icon.jpg',
		background: '/assets/environments/jupiter-background.jpg',
		brightnessOffset: 'bg-black/6',
	},
	{
		id: 'yosemite',
		label: 'Yosemite',
		icon: '/assets/environments/yosemite-icon.jpg',
		background: '/assets/environments/yosemite-background.jpg',
		brightnessOffset: 'bg-black/10',
	},
	{
		id: 'joshua-tree',
		label: 'Joshua Tree',
		icon: '/assets/environments/joshua-tree-icon.jpg',
		background: '/assets/environments/joshua-tree-background.jpg',
		brightnessOffset: 'bg-black/15',
	},
	{
		id: 'bora-bora',
		label: 'Bora Bora',
		icon: '/assets/environments/bora-bora-icon.jpg',
		background: '/assets/environments/bora-bora-background.jpg',
		brightnessOffset: 'bg-black/15',
	},
	{
		id: 'haleakala',
		label: 'Haleakala',
		icon: '/assets/environments/haleakala-icon.jpg',
		background: '/assets/environments/haleakala-background.jpg',
		brightnessOffset: 'bg-black/20',
	},
]

export default data
