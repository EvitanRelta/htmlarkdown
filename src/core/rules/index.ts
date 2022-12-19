import { blockRules } from './blockRules'
import { miscRules } from './miscRules'
import { tableRules } from './tableRules'
import { textFormattingRules } from './textFormattingRules'

/**
 * Rules are checked starting from the **BACK** of the array to the front.
 *
 * This is so the newer rules *(added by the user)* that are pushed to the back
 * are prioritised.
 *
 * _**Note:** This is opposite of pre/text-processes, which are all evaluated
 * starting from the **FRONT**._
 */
export const rules = [...tableRules, ...miscRules, ...textFormattingRules, ...blockRules]
