import type { PostProcess } from '../../types'
import { unindent } from '../../utilities'

export const unindentCodeblocks: PostProcess = (rawMarkdown) =>
    rawMarkdown.replaceAll(/ *<pre><code>(.|\n)+?<\/code><\/pre>/g, (match) => {
        const indentSize = match.match(/^ */)![0].length
        return unindent(match, indentSize)
    })
