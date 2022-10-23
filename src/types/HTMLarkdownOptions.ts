import type { UrlTransformer } from './UrlTransformer'

export interface HTMLarkdownOptions {
    /**
     * Transforms the URLs of hyperlinks & images.
     * @default null
     */
    urlTransformer: null | UrlTransformer
}
