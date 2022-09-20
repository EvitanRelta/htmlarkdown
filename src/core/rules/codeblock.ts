import { any } from 'predicate-hof'
import type { Rule } from '../../types'
import { hasChildElements, obeyForceHtml } from '../../utilities'

const hasOnlyCodeChild = (element: Element) =>
    element.childNodes.length === 1 && element.firstChild!.nodeName === 'CODE'
const innerCodeHasChildElement = (element: Element) => hasChildElements(element.firstElementChild!)

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
export const codeblock: Rule = {
    filter: ['pre', hasOnlyCodeChild],
    toUseHtmlPredicate: any(obeyForceHtml, innerCodeHasChildElement),
    replacement: (element) => {
        const language = element.getAttribute('lang') || ''
        return '```' + `${language}\n` + element.textContent! + '\n```\n\n'
    },
    htmlReplacement: (element) => ({
        childOptions: { forceHtml: true, escapeWhitespace: false },
        value: (innerContent) => {
            const language = element.getAttribute('lang') || ''
            const language_attr = language ? ` lang="${language}"` : ''
            return `<pre${language_attr}><code>\n${innerContent}\n</code></pre>\n\n`
        },
    }),
}
