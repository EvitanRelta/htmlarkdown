import { Rule } from '../../types'
import { hasLeadingTrailingSpaces } from '../../utilities'

export const italic: Rule = {
    filter: ['i', 'em'],
    toUseHtmlPredicate: hasLeadingTrailingSpaces,
    replacement: () => (innerContent) => `*${innerContent}*`,
    htmlReplacement: () => (innerContent) => `<em>${innerContent}</em>`,
}
