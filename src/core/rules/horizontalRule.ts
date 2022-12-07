import type { RuleWithHTML } from '../../types'
import { obeyForceHtml } from '../../utilities'

export const horizontalRule: RuleWithHTML = {
    filter: 'hr',
    toUseHtmlPredicate: obeyForceHtml,
    replacement: () => '---\n\n',
    htmlReplacement: () => '<hr>\n\n',
}
