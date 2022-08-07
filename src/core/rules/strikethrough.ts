import { Rule } from '../../types'
import { hasLeadingTrailingSpaces } from '../../utilities'

export const strikethrough: Rule = {
    filter: ['s', 'del'],
    toUseHtmlPredicate: hasLeadingTrailingSpaces,
    replacement: () => (innerContent) => `~~${innerContent}~~`,
    htmlReplacement: () => (innerContent) => `<s>${innerContent}</s>`,
}
