import type { Rule } from '../../types'

const isChildOfPre = (element: Element) => element.parentElement?.tagName === 'PRE'

/**
 * The inner `<code>` tag of codeblocks. It just relays the `innerContent` and
 * nothing else.
 *
 * Used to ensure the inner `<code>` isn't ignored and filtered out.
 */
export const codeblockInner: Rule = {
    filter: ['code', isChildOfPre],
    replacement: () => (innerContent) => innerContent,
}
