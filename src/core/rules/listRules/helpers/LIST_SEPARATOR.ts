/**
 * The string that's inserted inbetween adjacent lists' markdowns, to prevent
 * them from being combined by markdown-to-HTML renderers.
 *
 * Inserted by the `insertListSeparator` post-process.
 * @see {@link https://github.com/EvitanRelta/htmlarkdown/issues/16}
 */
export const LIST_SEPARATOR = '<!-- LIST_SEPARATOR -->\n\n'
