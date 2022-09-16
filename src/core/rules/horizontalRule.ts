import { Rule } from '../../types'

export const horizontalRule: Rule = {
    filter: ['hr'],
    toUseHtmlPredicate: () => false,
    replacement: () => '---\n\n',
    htmlReplacement: () => '<hr>\n\n',
}
