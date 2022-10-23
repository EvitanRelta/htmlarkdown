import type { TagName } from './Rule'
import type { UrlTransformer } from './UrlTransformer'

export interface HTMLarkdownOptions {
    /**
     * Transforms the URLs of hyperlinks & images.
     * @default null
     */
    urlTransformer: null | UrlTransformer
    /**
     * The elements to avoid collapsing whitespaces in.
     *
     * Set this to `"all"` to completely preserve whitespaces, or `[]` to
     * completely collapse whitespaces.
     * @default ["pre"]
     */
    elementsNoWhitespaceCollapse: 'all' | TagName[]
}
