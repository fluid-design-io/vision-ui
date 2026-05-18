'use client'

import {
	BookOpen,
	Check,
	Glasses,
	Globe,
	Keyboard,
	KeyRound,
	Laptop,
	Shield,
	Type,
	X,
} from 'lucide-react'
import { useState } from 'react'
import { ListGroup } from '@/components/list-group'
import { Switch } from '@/components/switch'

export function SettingsGeneralScreen() {
	const [notificationsEnabled, setNotificationsEnabled] = useState(true)
	const [hapticsEnabled, setHapticsEnabled] = useState(false)

	return (
		<div className="flex w-full max-w-xl flex-col gap-5">
			<ListGroup>
				<ListGroup.Item>
					<ListGroup.ItemPrefix>
						<Glasses className="size-6 text-sky-300/90" strokeWidth={1.75} />
					</ListGroup.ItemPrefix>
					<ListGroup.ItemContent>
						<ListGroup.ItemTitle>About</ListGroup.ItemTitle>
					</ListGroup.ItemContent>
					<ListGroup.ItemSuffix />
				</ListGroup.Item>
			</ListGroup>

			<ListGroup>
				<ListGroup.Item>
					<ListGroup.ItemPrefix>
						<Shield className="size-6 text-white/70" strokeWidth={1.75} />
					</ListGroup.ItemPrefix>
					<ListGroup.ItemContent>
						<ListGroup.ItemTitle>Notifications</ListGroup.ItemTitle>
					</ListGroup.ItemContent>
					<ListGroup.ItemSuffix>
						<Switch
							isSelected={notificationsEnabled}
							onSelectedChange={setNotificationsEnabled}
							aria-label="Notifications"
						/>
					</ListGroup.ItemSuffix>
				</ListGroup.Item>
				<ListGroup.Separator />
				<ListGroup.Item>
					<ListGroup.ItemPrefix>
						<Keyboard className="size-6 text-white/70" strokeWidth={1.75} />
					</ListGroup.ItemPrefix>
					<ListGroup.ItemContent>
						<ListGroup.ItemTitle>Haptics</ListGroup.ItemTitle>
					</ListGroup.ItemContent>
					<ListGroup.ItemSuffix>
						<Switch
							isSelected={hapticsEnabled}
							onSelectedChange={setHapticsEnabled}
							aria-label="Haptics"
						>
							<Switch.Thumb />
							<Switch.StartContent>
								<X strokeWidth={2.5} />
							</Switch.StartContent>
							<Switch.EndContent>
								<Check strokeWidth={2.5} />
							</Switch.EndContent>
						</Switch>
					</ListGroup.ItemSuffix>
				</ListGroup.Item>
			</ListGroup>

			<ListGroup>
				<ListGroup.Item>
					<ListGroup.ItemPrefix>
						<KeyRound className="size-6 text-white/75" strokeWidth={1.75} />
					</ListGroup.ItemPrefix>
					<ListGroup.ItemContent>
						<ListGroup.ItemTitle>AutoFill &amp; Passwords</ListGroup.ItemTitle>
					</ListGroup.ItemContent>
					<ListGroup.ItemSuffix />
				</ListGroup.Item>
				<ListGroup.Separator />
				<ListGroup.Item>
					<ListGroup.ItemPrefix>
						<BookOpen className="size-6 text-sky-400/90" strokeWidth={1.75} />
					</ListGroup.ItemPrefix>
					<ListGroup.ItemContent>
						<ListGroup.ItemTitle>Dictionary</ListGroup.ItemTitle>
					</ListGroup.ItemContent>
					<ListGroup.ItemSuffix />
				</ListGroup.Item>
				<ListGroup.Separator />
				<ListGroup.Item>
					<ListGroup.ItemPrefix>
						<Type className="size-6 text-white/70" strokeWidth={1.75} />
					</ListGroup.ItemPrefix>
					<ListGroup.ItemContent>
						<ListGroup.ItemTitle>Fonts</ListGroup.ItemTitle>
					</ListGroup.ItemContent>
					<ListGroup.ItemSuffix />
				</ListGroup.Item>
				<ListGroup.Separator />
				<ListGroup.Item>
					<ListGroup.ItemPrefix>
						<Keyboard className="size-6 text-white/70" strokeWidth={1.75} />
					</ListGroup.ItemPrefix>
					<ListGroup.ItemContent>
						<ListGroup.ItemTitle>Keyboard</ListGroup.ItemTitle>
					</ListGroup.ItemContent>
					<ListGroup.ItemSuffix />
				</ListGroup.Item>
				<ListGroup.Separator />
				<ListGroup.Item>
					<ListGroup.ItemPrefix>
						<Globe className="size-6 text-sky-400/90" strokeWidth={1.75} />
					</ListGroup.ItemPrefix>
					<ListGroup.ItemContent>
						<ListGroup.ItemTitle>Language &amp; Region</ListGroup.ItemTitle>
					</ListGroup.ItemContent>
					<ListGroup.ItemSuffix />
				</ListGroup.Item>
			</ListGroup>

			<ListGroup>
				<ListGroup.Item>
					<ListGroup.ItemPrefix>
						<Shield className="size-6 text-white/70" strokeWidth={1.75} />
					</ListGroup.ItemPrefix>
					<ListGroup.ItemContent>
						<ListGroup.ItemTitle>VPN &amp; Device Management</ListGroup.ItemTitle>
					</ListGroup.ItemContent>
					<ListGroup.ItemSuffix />
				</ListGroup.Item>
			</ListGroup>

			<ListGroup>
				<ListGroup.Item>
					<ListGroup.ItemPrefix>
						<Laptop className="size-6 text-white/70" strokeWidth={1.75} />
					</ListGroup.ItemPrefix>
					<ListGroup.ItemContent>
						<ListGroup.ItemTitle>Remote Devices</ListGroup.ItemTitle>
					</ListGroup.ItemContent>
					<ListGroup.ItemSuffix />
				</ListGroup.Item>
			</ListGroup>
		</div>
	)
}
