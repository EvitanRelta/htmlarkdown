import { HTMLarkdown } from '../../core'
import { isRuleWithHtml, mergeOverwriteArray } from '../../core/helpers'
import type { PassDownOptions, ToUseHtmlPredicate } from '../../types'

/**
 * A Higher-Order-Function that takes in the current rule's childOptions
 * *(if any)*, and returns a `ToUseHtmlPredicate` which returns `true` if any
 * direct child-elements will be in HTML-in-markdown syntax.
 *
 * To check both direct and nested children, use `childWillBeHtml` instead.
 * @param newChildOptions The current rule's childOptions.  \
 * _(default: `{}`)_
 * @returns A `ToUseHtmlPredicate` that checks if any direct child-elements will
 * be in HTML-in-markdown syntax.
 */
export const directChildWillBeHtml =
    (newChildOptions: Partial<PassDownOptions> = {}): ToUseHtmlPredicate =>
    (element, options, parentOptions) => {
        const childOptions = mergeOverwriteArray({}, parentOptions, newChildOptions)
        return Array.from(element.children).some((child) => {
            const rule = HTMLarkdown.findRule(child, options)
            if (!rule) return false

            if (isRuleWithHtml(rule) && rule.toUseHtmlPredicate(child, options, childOptions))
                return true

            return false
        })
    }
