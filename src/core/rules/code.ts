import { any, not } from 'predicate-hof'
import type { RuleWithHTML } from '../../types'
import { hasChildElements, obeyForceHtml } from '../../utilities'
import { isChildOfPre } from './codeblockInner'

export const code: RuleWithHTML = {
    filter: ['code', not(isChildOfPre)],
    toUseHtmlPredicate: any(obeyForceHtml, hasChildElements),
    replacement: (element) => `\`${element.textContent!}\``,
    htmlReplacement: () => (innerContent) => `<code>${innerContent}</code>`,
}
