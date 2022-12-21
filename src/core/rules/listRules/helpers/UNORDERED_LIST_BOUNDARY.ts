import { getRandBase62Str } from './getRandBase62Str'

/**
 * The string that's added to the start and end of an unordered-list's markdown.
 *
 * Used by the `insertListSeparator` post-process to identify where to insert
 * a separator to separate adjacent lists.
 * @see {@link https://github.com/EvitanRelta/htmlarkdown/issues/16}
 */
export const UNORDERED_LIST_BOUNDARY =
    '\n\n' +
    `<${getRandBase62Str(20)}---UNORDERED_LIST_BOUNDARY---${getRandBase62Str(20)}>` +
    '\n\n'
