import { any, not } from 'predicate-hof'
import type { RuleWithHTML } from '../../../types'
import { hasChildElements, isEmpty, obeyForceHtml } from '../../../utilities'
import { isChildOfPre } from '../blockRules/codeblockInner'

export const code: RuleWithHTML = {
    filter: [['code', not(isChildOfPre)]],
    toUseHtmlPredicate: any(obeyForceHtml, hasChildElements, isEmpty),
    replacement: (element) => `\`${element.textContent!}\``,
    htmlReplacement: (element) =>
        element.hasAttribute('forcehtml')
            ? {
                  childOptions: { forceHtml: true },
                  value: (innerContent) => `<code>${innerContent}</code>`,
              }
            : (innerContent) => `<code>${innerContent}</code>`,
}
