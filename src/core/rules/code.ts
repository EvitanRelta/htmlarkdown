import { any } from 'predicate-hof'
import type { Rule } from '../../types'
import { hasChildElements, obeyForceHtml } from '../../utilities'

const notChildOfPre = (element: Element) => element.parentElement?.tagName !== 'PRE'

export const code: Rule = {
    filter: ['code', notChildOfPre],
    toUseHtmlPredicate: any(obeyForceHtml, hasChildElements),
    replacement: (element) => `\`${element.textContent!}\``,
    htmlReplacement: () => (innerContent) => `<code>${innerContent}</code>`,
}
