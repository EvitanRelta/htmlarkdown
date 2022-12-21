/**
 * Options that are passed-down from parent elements to child nodes during
 * markdown conversion.
 *
 * Used by rules and text-processes.
 */
export interface PassDownOptions {
    /** Forces the element and it's child-nodes to use HTML-in-markdown syntax. */
    forceHtml: boolean
    /**
     * Whether to escape spaces to `'&nbsp;'`.
     *
     * Mainly to prevent codeblocks from escaping spaces.
     */
    escapeWhitespace: boolean
    /**
     * The container element that's being converted.
     *
     * Useful for checking if an element is a direct-child of the container.
     */
    containerElement: Element
    /**
     * Whether the element is inside a block-element.
     *
     * Mainly used to determine if a HTML-in-markdown conversion should
     * add extra trailing-newlines.
     */
    isInsideBlockElement: boolean
    /**
     * Whether the element is part of an ordered-list.
     *
     * Used to control the conversion of `<li>` elements.  \
     * _(eg. list-items can be either: `- unordered` or `1. ordered`)_
     */
    isOrderedList: boolean
    /**
     * Whether the element is inside a list.
     *
     * Mainly used to control the leading/trailing newlines of list conversions.
     */
    isInsideList: boolean
    /**
     * The starting number of the current ordered-list.
     *
     * Used to control the counter-prefix of ordered-lists' list-items.
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
     */
    isLooseList: boolean
}
