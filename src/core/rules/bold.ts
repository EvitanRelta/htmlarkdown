import { Rule } from '../../types'

export const bold: Rule = {
    filter: ['b', 'strong'],
    toUseHtmlPredicate: () => false,
    replacement: () => (innerContent) => `**${innerContent}**`,
    htmlReplacement: () => (innerContent) => `<b>${innerContent}</b>`,
}
