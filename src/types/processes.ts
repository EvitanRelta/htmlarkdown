import type { HTMLarkdownOptions } from './HTMLarkdownOptions'
import type { PassDownOptions } from './PassDownOptions'
import type { TextNode } from './TextNode'

/**
 * Preprocesses modify the container element.  \
 * They are ran first, before the any other processes/rules.
 *
 * They are used to "clean-up" the elements before being converted to
 * markdown by the rules/text-processes.
 *
 * _**Note:** The container element can be safely mutated, as
 * `HTMLarkdown.convert` deep-clones the container element given to it._
 * @param container The container element to be processed.
 * @param options Options from the `HTMLarkdown` instance.
 * @returns The modified container element.
 */
export type Preprocess = (container: Element, options: HTMLarkdownOptions) => Element

/**
 * Text-processes transforms the text in each text-node.  \
 * They are ran after preprocesses, and together with rules.
 *
 * They are mainly used to escape text characters, such as markdown-specific
 * ones like `**` *(ie. bold)* & `#` *(ie. heading)*.
 * @param text The text to be transformed.
 * @param textNode The text-node containing the text.
 * @param options Options from the `HTMLarkdown` instance.
 * @param parentOptions Options passed-down from the parent-element.
 * @returns The transformed text.
 */
export type TextProcess = (
    text: string,
    textNode: TextNode,
    options: HTMLarkdownOptions,
    parentOptions: PassDownOptions
) => string

/**
 * Post-processes transforms the markdown output string produced by the
 * rules/text-processes.  \
 * They are ran last, after all other processes/rules.
 *
 * They are used to "clean-up" the final markdown string, such as for trimming
 * excess newlines from the markdown.
 * @param rawMarkdown The markdown to be transformed.
 * @param options Options from the `HTMLarkdown` instance.
 * @returns The transformed markdown.
 */
export type PostProcess = (rawMarkdown: string, options: HTMLarkdownOptions) => string
