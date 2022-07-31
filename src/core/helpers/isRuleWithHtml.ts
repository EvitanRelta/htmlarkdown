import type { Rule, RuleWithHTML } from '../../types'

export const isRuleWithHtml = (rule: Rule): rule is RuleWithHTML =>
    (rule as RuleWithHTML).toUseHtmlPredicate !== undefined
