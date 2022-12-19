import type { RuleWithHTML } from '../../../types'
import { obeyForceHtml } from '../../../utilities'

export const italic: RuleWithHTML = {
    filter: ['i', 'em'],
    toUseHtmlPredicate: obeyForceHtml,
    replacement: () => (innerContent) => `*${innerContent}*`,
    htmlReplacement: () => (innerContent) => `<i>${innerContent}</i>`,
}
