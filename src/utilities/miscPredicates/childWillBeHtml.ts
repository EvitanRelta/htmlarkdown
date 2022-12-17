import { HTMLarkdown } from '../../core'
import { isRuleWithHtml, mergeOverwriteArray } from '../../core/helpers'
import type { ReplacementFunction, ReplacementObj, ToUseHtmlPredicate } from '../../types'

const willBeHtml: ToUseHtmlPredicate = (element, options, parentOptions) => {
    const rule = HTMLarkdown.findRule(element, options)
    if (!rule) return false

    if (isRuleWithHtml(rule) && rule.toUseHtmlPredicate(element, options, parentOptions))
        return true

    const replacementFunc = rule.replacement
    let value
    let childOptions = parentOptions
    const replacement = replacementFunc(element, options, parentOptions)
    const isReplacementObj = (
        replacement: ReturnType<ReplacementFunction>
    ): replacement is ReplacementObj => typeof replacement === 'object'

    if (isReplacementObj(replacement)) {
        value = replacement.value
        childOptions = mergeOverwriteArray({}, parentOptions, replacement.childOptions)
    } else {
        value = replacement
    }

    if (typeof value === 'string') return false

    return Array.from(element.children).some((child) => willBeHtml(child, options, childOptions))
}

/**
 * Returns `true` if any child-elements *(both direct and nested children)* will
 * be in HTML-in-markdown syntax.
 */
export const childWillBeHtml: ToUseHtmlPredicate = (element, ...rest) =>
    Array.from(element.children).some((child) => willBeHtml(child, ...rest))
