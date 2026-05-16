import { GridList } from '@/components/grid-list'
import { items, renderHomeCell } from './home.items'

export default function GridListScreen() {
	return <GridList items={items} renderCell={renderHomeCell} />
}
