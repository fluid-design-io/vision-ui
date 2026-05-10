import { createAtom } from '@tanstack/store'
import { Environment } from './environment.types'

const environmentAtom = createAtom<Environment | null>(null)

export default environmentAtom
