import type { Rule } from '../../types'
import { hasOnlyLinebreaks, isHeading } from '../../utilities'

export const BR_TAG_STR = '<br>'

export const linebreak: Rule = {
    filter: 'br',
    replacement: (element) => {
        const parent = element.parentElement!
        const prefix = element.previousSibling === null || isHeading(parent) ? '' : '\n'
        const content =
            element.nextSibling || hasOnlyLinebreaks(parent) ? BR_TAG_STR : BR_TAG_STR + BR_TAG_STR
        return prefix + content
    },
}
