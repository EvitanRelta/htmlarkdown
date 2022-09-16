import { Rule } from '../../types'

export const strikethrough: Rule = {
    filter: ['s', 'del'],
    toUseHtmlPredicate: () => false,
    replacement: () => (innerContent) => `~~${innerContent}~~`,
    htmlReplacement: () => (innerContent) => `<s>${innerContent}</s>`,
}
