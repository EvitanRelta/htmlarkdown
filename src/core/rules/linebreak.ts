import type { Rule } from '../../types'
import { hasOnlyLinebreaks, isHeading } from '../../utilities'

export const linebreak: Rule = {
    filter: 'br',
    replacement: (element) => {
        const parent = element.parentElement!
        const prefix = element.previousSibling === null || isHeading(parent) ? '' : '\n'
        const content = element.nextSibling || hasOnlyLinebreaks(parent) ? '<br>' : '<br><br>'
        return prefix + content
    },
}
