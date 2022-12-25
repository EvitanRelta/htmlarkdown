import { unindent } from './unindent'

/**
 * Indents a string with spaces.
 * @param str String to indent.
 * @param indentSize The number of spaces to indent by.
 * @returns The indented string.
 */
const _indent = (str: string, indentSize = 2) => str.replaceAll(/^/gm, ' '.repeat(indentSize))

/**
 * Undents any HTML-codeblocks that's inside a string.
 * @param str String to unindent.
 * @param indentSize The number of spaces to unindent HTML-codeblocks by.
 * @returns The string with all its HTML-codeblocks unindented.
 */
const unindentHtmlCodeblocks = (str: string, unindentSize = 2) =>
    str.replaceAll(/ *<pre[^>]*><code>(.|\n)+?<\/code><\/pre>/g, (match) =>
        unindent(match, unindentSize)
    )

/**
 * Indents a string with spaces, but avoids indenting HTML-syntax codeblocks.  \
 * For example, this HTML:
 * ```html
 * <blockquote forcehtml>
 *   <p>PARAGRAPH</p>
 * </blockquote>
 *
 * <blockquote forcehtml>
 *   <pre><code>CODEBLOCK</code></pre>
 * </blockquote>
 * ```
 *
 * is converted to this HTML-in-markdown:
 * ```html
 * <blockquote>
 *   <p>PARAGRAPH</p>
 * </blockquote>
 *
 * <blockquote>
 * <pre><code>CODEBLOCK
 * </code></pre>
 * </blockquote>
 * ```
 *
 * where the **paragraph is indented**, but **not the codeblock**.
 * @param str String to indent.
 * @param indentSize The number of spaces to indent by.
 * @param indentHtmlCodeblocks Whether to indent or avoid indenting HTML-codeblocks.
 * @returns The indented string.
 * @see The context section of {@link https://github.com/EvitanRelta/htmlarkdown/issues/26}.
 */
export const indent = (str: string, indentSize = 2, indentHtmlCodeblocks = false) => {
    const indented = _indent(str, indentSize)
    if (indentHtmlCodeblocks) return indented
    return unindentHtmlCodeblocks(indented, indentSize)
}
