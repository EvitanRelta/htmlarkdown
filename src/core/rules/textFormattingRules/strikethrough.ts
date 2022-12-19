import type { RuleWithHTML } from '../../../types'
import { obeyForceHtml } from '../../../utilities'

export const strikethrough: RuleWithHTML = {
    filter: ['s', 'del'],
    toUseHtmlPredicate: obeyForceHtml,
    replacement: () => (innerContent) => `~~${innerContent}~~`,
    htmlReplacement: () => (innerContent) => `<s>${innerContent}</s>`,
}
