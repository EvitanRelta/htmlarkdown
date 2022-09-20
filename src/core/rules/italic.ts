import { Rule } from '../../types'

export const italic: Rule = {
    filter: ['i', 'em'],
    toUseHtmlPredicate: () => false,
    replacement: () => (innerContent) => `*${innerContent}*`,
    htmlReplacement: () => (innerContent) => `<i>${innerContent}</i>`,
}
