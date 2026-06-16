import { ListGroup } from '@/components/list-group'

export function SettingsAboutScreen() {
	return (
		<div className="flex w-full max-w-xl flex-col gap-5">
			<ListGroup>
				<ListGroup.Item>
					<ListGroup.ItemContent>
						<ListGroup.ItemTitle>Name</ListGroup.ItemTitle>
					</ListGroup.ItemContent>
					<ListGroup.ItemSuffix>Vision UI</ListGroup.ItemSuffix>
				</ListGroup.Item>
				<ListGroup.Separator />
				<ListGroup.Item>
					<ListGroup.ItemContent>
						<ListGroup.ItemTitle>OS Version</ListGroup.ItemTitle>
					</ListGroup.ItemContent>
					<ListGroup.ItemSuffix>27.0</ListGroup.ItemSuffix>
				</ListGroup.Item>
				<ListGroup.Separator />
				<ListGroup.Item>
					<ListGroup.ItemContent>
						<ListGroup.ItemTitle>Author</ListGroup.ItemTitle>
					</ListGroup.ItemContent>
					<ListGroup.ItemSuffix>Oliver</ListGroup.ItemSuffix>
				</ListGroup.Item>
			</ListGroup>
		</div>
	)
}
