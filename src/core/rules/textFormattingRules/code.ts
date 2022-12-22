import { any, not } from 'predicate-hof'
import type { RuleWithHTML } from '../../../types'
import { isEmpty, obeyForceHtml } from '../../../utilities'
import { isChildOfPre } from '../blockRules/codeblockInner'

const hasChildElements = (element: Element) => element.childElementCount > 0

export const code: RuleWithHTML = {
    filter: [['code', not(isChildOfPre)]],
    toUseHtmlPredicate: any(obeyForceHtml, hasChildElements, isEmpty),
    replacement: () => ({
        childOptions: { escapeHtml: false, escapeMarkdown: false },
        value: (innerContent) => `\`${innerContent}\``,
    }),
    htmlReplacement: (element) =>
        element.hasAttribute('forcehtml')
            ? {
                  childOptions: { forceHtml: true },
                  value: (innerContent) => `<code>${innerContent}</code>`,
              }
            : (innerContent) => `<code>${innerContent}</code>`,
}
