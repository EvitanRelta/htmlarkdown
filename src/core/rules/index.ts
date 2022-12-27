import type { Rule } from '../../types'
import { blockRules } from './blockRules'
import { listRules } from './listRules'
import { miscRules } from './miscRules'
import { tableRules } from './tableRules'
import { textFormattingRules } from './textFormattingRules'
import { voidRules } from './voidRules'

/**
 * Rules are checked starting from the **BACK** of the array to the front.
 *
 * This is so the newer rules *(added by the user)* can be pushed to the back
 * and prioritised.
 */
export const rules: Rule[] = [
    ...tableRules,
    ...listRules,
    ...miscRules,
    ...voidRules,
    ...textFormattingRules,
    ...blockRules,
]
