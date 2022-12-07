import type { Rule } from '../../../types'
import { listItem } from './listItem'
import { orderedList } from './orderedList'
import { unorderedList } from './unorderedList'

export const listRules: Rule[] = [orderedList, unorderedList, listItem]
