import type { HTMLarkdownOptions } from './HTMLarkdownOptions'
import type { PassDownOptions } from './PassDownOptions'

export type UrlTransformer = (
    url: string,
    element: Element,
    options: HTMLarkdownOptions,
    parentOptions: PassDownOptions
) => string
