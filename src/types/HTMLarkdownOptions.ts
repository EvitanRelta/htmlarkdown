import type { UrlTransformer } from './UrlTransformer'

export interface HTMLarkdownOptions {
    /**
     * Transforms the URLs of hyperlinks & images.
     * @default null
     */
    urlTransformer: null | UrlTransformer
    /**
     * Whether to collapse whitespaces. Set this to `false` if you want to
     * preserve whitespaces.
     * @default true
     */
    collapseWhitespace: boolean
}
