import type { HTMLarkdownOptions } from './HTMLarkdownOptions'

/**
 * Pre-processes modify the container element.  \
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
export type PreProcess = (container: Element, options: HTMLarkdownOptions) => Element
