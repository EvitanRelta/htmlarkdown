import type { HTMLarkdownOptions } from './HTMLarkdownOptions'
import type { TextNode } from './TextNode'

export type Preprocess = (container: Element, options: HTMLarkdownOptions) => Element
export type TextProcess = (text: string, textNode: TextNode, options: HTMLarkdownOptions) => string
