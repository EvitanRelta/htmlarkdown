import type { Rule, RuleWithHTML } from '../../types'

/**
 * Returns `true` if the rule is of type `RuleWithHTML`, which is a `Rule`  \
 * that has a different conversion for markdown vs HTML-in-markdown syntax,  \
 * and has the properties: `toUseHtmlPredicate` & `htmlReplacement`.
 */
export const isRuleWithHtml = (rule: Rule): rule is RuleWithHTML =>
    (rule as RuleWithHTML).toUseHtmlPredicate !== undefined
