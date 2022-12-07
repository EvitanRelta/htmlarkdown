import { any, not } from 'predicate-hof'
import type { Rule } from '../../types'
import { hasChildElements, obeyForceHtml } from '../../utilities'
import { isChildOfPre } from './codeblockInner'

export const code: Rule = {
    filter: ['code', not(isChildOfPre)],
    toUseHtmlPredicate: any(obeyForceHtml, hasChildElements),
    replacement: (element) => `\`${element.textContent!}\``,
    htmlReplacement: () => (innerContent) => `<code>${innerContent}</code>`,
}
