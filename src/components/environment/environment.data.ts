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
		icon: '/assets/environments/adam-kool-yosemite-icon.avif',
		background: '/assets/environments/adam-kool-yosemite-background.avif',
		credit: {
			name: 'Adam Kool',
			url: 'https://unsplash.com/@adamkool',
		},
		brightnessOffset: 'bg-black/20',
	},
	{
		id: 'joshua-tree',
		label: 'Joshua Tree',
		icon: '/assets/environments/cedric-letsch-joshua-tree-icon.avif',
		background: '/assets/environments/cedric-letsch-joshua-tree-background.avif',
		credit: {
			name: 'Cedric Letsch',
			url: 'https://unsplash.com/@cedricletsch',
		},
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
