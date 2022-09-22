import type { Rule } from '../../types'
import { obeyForceHtml } from '../../utilities'

export const horizontalRule: Rule = {
    filter: 'hr',
    toUseHtmlPredicate: obeyForceHtml,
    replacement: () => '---\n\n',
    htmlReplacement: () => '<hr>\n\n',
}
