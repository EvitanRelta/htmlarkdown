import { Rule } from '../../types'
import { hasLeadingTrailingSpaces } from '../../utilities'

export const bold: Rule = {
    filter: ['b', 'strong'],
    toUseHtmlPredicate: hasLeadingTrailingSpaces,
    replacement: () => (innerContent) => `**${innerContent}**`,
    htmlReplacement: () => (innerContent) => `<strong>${innerContent}</strong>`,
}
