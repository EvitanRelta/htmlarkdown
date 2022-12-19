/**
 * Options that are passed-down from parent elements to child nodes during
 * markdown conversion.
 *
 * Used by rules and text-processes.
 */
export interface PassDownOptions {
    /**
     * Forces the element and it's child-nodes to use HTML-in-markdown syntax.
     * @default false
     */
    forceHtml: boolean
    /**
     * Whether to escape spaces to `'&nbsp;'`.
     *
     * Mainly to prevent codeblocks from escaping spaces.
     * @default true
     */
    escapeNbsp: boolean
    /**
     * The container element that's being converted.
     *
     * Useful for checking if an element is a direct-child of the container.
     *
     * _**Note:** This is not the same element given to the `HTMLarkdown.convert`
     * method, as `HTMLarkdown.convert` deep-clones the element._
     */
    containerElement: Element
    /**
     * Whether the element is inside a block-element.
     *
     * Mainly used to determine if a HTML-in-markdown conversion should
     * add extra trailing-newlines.
     * @default false
     */
    isInsideBlockElement: boolean
    /**
     * Whether the element is part of an ordered-list.
     *
     * Used to control the conversion of `<li>` elements.  \
     * _(eg. list-items can be either: `- unordered` or `1. ordered`)_
     * @default false
     */
    isOrderedList: boolean
    /**
     * Whether the element is inside a list.
     *
     * Mainly used to control the leading/trailing newlines of list conversions.
     * @default false
     */
    isInsideList: boolean
    /**
     * The starting number of the current ordered-list.
     *
     * Used to control the counter-prefix of ordered-lists' list-items.
     * @default -1
     */
    olStartingNum: number
    /**
     * Whether the element is part of an [loose-list](https://github.github.com/gfm/#loose).
     *
     * HTML examples of loose-list:
     * ```html
     * <ul>
     *   <li><p>Item 1</p></li>
     *   <li><p>Item 2</p></li>
     * </ul>
     * ```
     *
     * ```html
     * <ul>
     *   <li><p>Item 1</p></li>
     *   <li>
     *     <p>Item 2</p>
     *     <h1>Item 2 (heading)</h1>
     *   </li>
     * </ul>
     * ```
     *
     * Used to control whether to add blank-lines inbetween list-items.  \
     * For example:
     * ```md
     * - Item 1
     *
     * - Item 2
     *
     * - Item 3
     * ```
     * @default false
     */
    isLooseList: boolean
    /**
     * Whether to escape markdown patterns in the text.  \
     * For example:
     * ```html
     * <p># _Not header nor italised_</p>
     * ```
     * Is escaped to this markdwon:
     * ```md
     * \# \_Not header nor italised\_
     * ```
     */
    escapeMarkdown: boolean
    /**
     * Whether to escape HTML-entities _(eg. `&`, `<`, etc.)_ in the text.  \
     * For example:
     * ```html
     * <p forcehtml>&amp;amp;</p>
     * ```
     * Is escaped to this markdwon:
     * ```html
     * <p>&amp;amp;</p>
     * ```
     * _**Note:** The characters that are escaped is controlled by the
     * `HTMLarkdownOptions.htmlEscapingMode` option._
     */
    escapeHtml: boolean
}
