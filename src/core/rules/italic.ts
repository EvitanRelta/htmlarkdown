import type { Rule } from '../../types'
import { obeyForceHtml } from '../../utilities'

export const italic: Rule = {
    filter: ['i', 'em'],
    toUseHtmlPredicate: obeyForceHtml,
    replacement: () => (innerContent) => `*${innerContent}*`,
    htmlReplacement: () => (innerContent) => `<i>${innerContent}</i>`,
}
