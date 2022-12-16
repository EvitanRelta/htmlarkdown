import type { RuleWOHTML } from '../../types'
import { isHeading } from '../../utilities'

export const BR_TAG_STR = '<br>'

export const linebreak: RuleWOHTML = {
    filter: ['br'],
    replacement: (element) => {
        const parent = element.parentElement!
        const prefix = element.previousSibling === null || isHeading(parent) ? '' : '\n'
        return prefix + BR_TAG_STR
    },
}
