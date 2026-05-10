import { GridList } from '@/components/grid-list'
import { items, renderCell } from './environments.items'

export default function EnvironmentsScreen() {
	return <GridList items={items} renderCell={renderCell} />
}
