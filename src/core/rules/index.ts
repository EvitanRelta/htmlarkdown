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
 * This is so the newer rules *(added by the user)* that are pushed to the back
 * are prioritised.
 *
 * _**Note:** This is opposite of pre/text-processes, which are all evaluated
 * starting from the **FRONT**._
 */
export const rules: Rule[] = [
    ...tableRules,
    ...listRules,
    ...miscRules,
    ...voidRules,
    ...textFormattingRules,
    ...blockRules,
]
