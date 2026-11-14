import { PreferencesHydrator } from '@/lib/preferences'
import { SoundProvider } from '@/lib/sound/sound.provider'
import appCss from '@/styles/app.css?url'
import stylesCss from '@/styles/styles.scss?url'
import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import { RootProvider } from 'fumadocs-ui/provider/tanstack'

const SITE_URL = 'https://vision.uing.dev'
const SITE_TITLE = 'Vision UI'
const SITE_DESCRIPTION = 'VisionOS UI built with React ⚛️'
const OG_IMAGE = `${SITE_URL}/og/og-image.jpg`
const OG_VIDEO = `${SITE_URL}/og/og-video.mp4`
const OG_MEDIA_WIDTH = '1304'
const OG_MEDIA_HEIGHT = '720'

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				title: SITE_TITLE,
			},
			{
				name: 'description',
				content: SITE_DESCRIPTION,
			},
			{ property: 'og:type', content: 'website' },
			{ property: 'og:site_name', content: SITE_TITLE },
			{ property: 'og:title', content: SITE_TITLE },
			{ property: 'og:description', content: SITE_DESCRIPTION },
			{ property: 'og:url', content: SITE_URL },
			{ property: 'og:image', content: OG_IMAGE },
			{ property: 'og:image:type', content: 'image/jpeg' },
			{ property: 'og:image:width', content: OG_MEDIA_WIDTH },
			{ property: 'og:image:height', content: OG_MEDIA_HEIGHT },
			{ property: 'og:image:alt', content: 'Vision UI environment picker over a Jupiter backdrop' },
			{ property: 'og:video', content: OG_VIDEO },
			{ property: 'og:video:secure_url', content: OG_VIDEO },
			{ property: 'og:video:type', content: 'video/mp4' },
			{ property: 'og:video:width', content: OG_MEDIA_WIDTH },
			{ property: 'og:video:height', content: OG_MEDIA_HEIGHT },
			{ name: 'twitter:card', content: 'summary_large_image' },
			{ name: 'twitter:title', content: SITE_TITLE },
			{ name: 'twitter:description', content: SITE_DESCRIPTION },
			{ name: 'twitter:image', content: OG_IMAGE },
		],
		links: [
			{ rel: 'stylesheet', href: appCss },
			{ rel: 'stylesheet', href: stylesCss },
			{
				rel: 'icon',
				href: '/icon.png',
			},
		],
	}),
	component: RootComponent,
})

function RootComponent() {
	return (
		<html suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className="flex flex-col min-h-screen">
				<RootProvider>
					<PreferencesHydrator />
					<SoundProvider>
						<Outlet />
					</SoundProvider>
				</RootProvider>
				<Scripts />
			</body>
		</html>
	)
}
