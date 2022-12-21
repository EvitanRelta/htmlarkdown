import type { HTMLarkdownOptions } from './HTMLarkdownOptions'

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
