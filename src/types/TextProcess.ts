import type { HTMLarkdownOptions } from './HTMLarkdownOptions'
import type { PassDownOptions } from './PassDownOptions'
import type { TextNode } from './TextNode'

/**
 * Text-processes transforms the text in each text-node.  \
 * They are ran after pre-processes, and together with rules.
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
