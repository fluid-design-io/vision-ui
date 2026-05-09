import { GridList } from '@/components/grid-list'
import { items, renderCell } from './home.items'

export default function GridListScreen() {
	return <GridList items={items} renderCell={renderCell} />
}
