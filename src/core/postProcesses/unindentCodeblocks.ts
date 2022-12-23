import type { PostProcess } from '../../types'
import { unindent } from '../../utilities'

/**
 * Removes any indentation applied to HTML-syntax codeblocks.
 * @see The context section of
 * {@link https://github.com/EvitanRelta/htmlarkdown/issues/26}.
 */
export const unindentCodeblocks: PostProcess = (rawMarkdown) =>
    rawMarkdown.replaceAll(/ *<pre><code>(.|\n)+?<\/code><\/pre>/g, (match) => {
        const indentSize = match.match(/^ */)![0].length
        return unindent(match, indentSize)
    })
