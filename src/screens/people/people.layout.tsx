import { GridList } from '@/components/grid-list'
import { items, renderCell } from './people.items'

export default function PeopleScreen() {
	return <GridList items={items} renderCell={renderCell} />
}
