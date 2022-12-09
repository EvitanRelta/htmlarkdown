import { any } from 'predicate-hof'
import type { RuleWithHTML, ToUseHtmlPredicate } from '../../types'
import { obeyForceHtml } from '../../utilities'

const isNotChildOfContainer: ToUseHtmlPredicate = (element, _, parentOptions) =>
    element.parentElement !== parentOptions.containerElement

export const horizontalRule: RuleWithHTML = {
    filter: 'hr',
    toUseHtmlPredicate: any(obeyForceHtml, isNotChildOfContainer),
    replacement: () => '---\n\n',
    htmlReplacement: (...args) => (isNotChildOfContainer(...args) ? '<hr>' : '<hr>\n\n'),
}
