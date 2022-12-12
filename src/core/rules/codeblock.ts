import { any } from 'predicate-hof'
import type { RuleWithHTML } from '../../types'
import { obeyForceHtml } from '../../utilities'
import { noopTags } from './noop'

const hasOnlyCodeChild = (element: Element) =>
    element.childNodes.length === 1 && element.firstChild!.nodeName === 'CODE'
const hasNonNoopElements = (element: Element) => {
    if (hasOnlyCodeChild(element)) element = element.firstElementChild!
    return element.querySelector(noopTags.map((x) => `:not(${x})`).join('')) !== null
}

/**
 * Expects codeblocks to be in the form:
 * ```html
 * <pre lang="javascript"><code>
 * function getTrue() {
 *     return true;
 * }
 * </code></pre>
 * ```
 *
 * And converts to:
 * ````markdown
 * ```javascript
 * function getTrue() {
 *     return true;
 * }
 * ```
 * ````
 */
export const codeblock: RuleWithHTML = {
    filter: ['pre'],
    toUseHtmlPredicate: any(obeyForceHtml, hasNonNoopElements),
    replacement: (element, options) => {
        const removeLastNewline = (str: string) => str.replace(/\n$/, '')
        const innerContent = ['remove', 'both'].includes(options.codeblockTrailingLinebreak)
            ? removeLastNewline(element.textContent!)
            : element.textContent!

        if (innerContent === '') return '```\n```\n\n'

        const language = element.getAttribute('lang') || ''

        const allBackticksText = Array.from(element.textContent!.matchAll(/^`{3,}/gm)).map(
            (x) => x[0]
        )
        const longestBacktick = allBackticksText.reduce(
            (x, acc) => (x.length > acc.length ? x : acc),
            '``'
        )
        const fence = longestBacktick + '`'
        return `${fence}${language}\n${innerContent}\n${fence}\n\n`
    },
    htmlReplacement: (element, options) => ({
        childOptions: { forceHtml: true, escapeWhitespace: false, isInsideBlockElement: true },
        value: (innerContent) => {
            const language = element.getAttribute('lang') || ''
            const language_attr = language ? ` lang="${language}"` : ''

            // Warns users that if language is specified in HTML-syntax,
            // the inner HTML elements might not render properly.
            if (language)
                console.warn(
                    'Codeblocks containing elements and has a specified syntax-highlighting language, might not render properly.' +
                        "\nFor Github's markdown renderer, when a codeblock has a language specifed, " +
                        'the syntax highlighting overrides and removes any elements (eg. bold/italics) in the codeblock.'
                )

            const removeLastNewline = (str: string) => str.replace(/\n$/, '')
            if (['remove', 'both'].includes(options.codeblockTrailingLinebreak))
                innerContent = removeLastNewline(innerContent)

            if (['add', 'both'].includes(options.codeblockTrailingLinebreak))
                return `<pre${language_attr}><code>${innerContent}\n</code></pre>\n\n`
            return `<pre${language_attr}><code>${innerContent}</code></pre>\n\n`
        },
    }),
}
