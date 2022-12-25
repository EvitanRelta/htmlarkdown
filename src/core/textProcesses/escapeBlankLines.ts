import type { TextProcess } from '../../types'

const ESCAPED_BLANK_LINE = '<!-- BLANK_LINE -->'

/**
 * Escape blank-lines _(ie. `\n\n`)_ in the text.  \
 * For example, this HTML:
 * ```html
 * <blockquote forcehtml>
 * <pre><code># Heading-1 markdown
 *
 * ## Heading-2 markdown
 * </code></pre>
 * </blockquote>
 * ```
 *
 * Is escaped to this markdwon:
 * ```html
 * <blockquote>
 * <pre><code># Heading-1 markdown
 * <!-- BLANK_LINE -->
 * ## Heading-2 markdown
 * </code></pre>
 * </blockquote>
 * ```
 *
 * Controlled by the `PassDownOptions.escapeBlankLines` option.
 * @see {@link https://github.com/EvitanRelta/htmlarkdown/issues/33}
 */
export const escapeBlankLines: TextProcess = (text, _, __, parentOptions) => {
    if (!parentOptions.escapeBlankLines) return text

    return text.replaceAll(/\n\n/g, `\n${ESCAPED_BLANK_LINE}\n`)
}
