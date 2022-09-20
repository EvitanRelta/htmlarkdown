import type { HTMLarkdownOptions } from './HTMLarkdownOptions'
import type { PassDownOptions } from './PassDownOptions'
import type { TextNode } from './TextNode'

export type Preprocess = (container: Element, options: HTMLarkdownOptions) => Element
export type TextProcess = (
    text: string,
    textNode: TextNode,
    options: HTMLarkdownOptions,
    parentOptions: PassDownOptions
) => string
