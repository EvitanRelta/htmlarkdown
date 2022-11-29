import type { Rule } from '../../../types'
import { listItem } from './listItem'
import { unorderedList } from './unorderedList'

export const listRules: Rule[] = [unorderedList, listItem]
