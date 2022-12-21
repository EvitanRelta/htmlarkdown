import type { PassDownOptions } from '../../../types'

/**
 * For cases where the block-element is in a tight-list, which cannot have
 * newlines.  \
 * For example:
 * ````md
 * - List-item 1
 *   ```
 *   Codeblock in list-item
 *   ```
 *   # Heading in list-item
 * - List-item 2
 * ````
 * @see {@link https://github.com/EvitanRelta/htmlarkdown/issues/18}
 */
const isInsideTightList = (parentOptions: PassDownOptions) =>
    parentOptions.isInsideList && !parentOptions.isLooseList

/**
 * Controls the trailing newlines added to _(almost all)_ block-elements'
 * markdowns.
 */
export const getBlockTrailingNewline = (parentOptions: PassDownOptions) => {
    if (isInsideTightList(parentOptions)) return '\n'
    return '\n\n'
}
