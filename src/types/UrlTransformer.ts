import type { HTMLarkdownOptions } from './HTMLarkdownOptions'
import type { PassDownOptions } from './PassDownOptions'

/**
 * Function to transform the URLs of hyperlinks & images.
 *
 * Useful for converting between relative URLs and absolute URLs.
 * @param url The URL to be transformed.
 * @param element The element containing the URL.  \
 * Either a `<a>` or `<img>` tag.
 * @param options Options from the `HTMLarkdown` instance.
 * @param parentOptions Options passed-down from the parent-element.
 * @returns The transformed URL.
 */
export type UrlTransformer = (
    url: string,
    element: Element,
    options: HTMLarkdownOptions,
    parentOptions: PassDownOptions
) => string
