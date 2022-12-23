import { any } from 'predicate-hof'
import type { RuleWithHTML, ToUseHtmlPredicate } from '../../../types'
import { obeyForceHtml } from '../../../utilities'
import { getBlockTrailingNewline } from '../helpers'

const isNotChildOfContainer: ToUseHtmlPredicate = (element, _, parentOptions) =>
    element.parentElement !== parentOptions.containerElement

export const horizontalRule: RuleWithHTML = {
    filter: ['hr'],
    toUseHtmlPredicate: any(obeyForceHtml, isNotChildOfContainer),
    replacement: (_, __, parentOptions) => '---' + getBlockTrailingNewline(parentOptions),
    htmlReplacement: (...args) => (isNotChildOfContainer(...args) ? '<hr>' : '<hr>\n\n'),
}
