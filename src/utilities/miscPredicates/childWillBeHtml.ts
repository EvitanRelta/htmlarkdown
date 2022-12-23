import { HTMLarkdown } from '../../core'
import { isRuleWithHtml, mergeOverwriteArray } from '../../core/helpers'
import type {
    PassDownOptions,
    ReplacementFunction,
    ReplacementObj,
    ToUseHtmlPredicate,
} from '../../types'

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
 * A Higher-Order-Function that takes in the current rule's childOptions
 * *(if any)*, and returns a `ToUseHtmlPredicate` which returns `true` if any
 * child-elements *(both direct and nested children)* will be in
 * HTML-in-markdown syntax.
 *
 * To check only direct children, use `directChildWillBeHtml` instead.
 * @param newChildOptions The current rule's childOptions.  \
 * _(default: `{}`)_
 * @returns A `ToUseHtmlPredicate` that checks if any direct child-elements will
 * be in HTML-in-markdown syntax.
 */
export const childWillBeHtml =
    (newChildOptions: Partial<PassDownOptions> = {}): ToUseHtmlPredicate =>
    (element, options, parentOptions) => {
        const childOptions = mergeOverwriteArray({}, parentOptions, newChildOptions)
        return Array.from(element.children).some((child) =>
            willBeHtml(child, options, childOptions)
        )
    }
