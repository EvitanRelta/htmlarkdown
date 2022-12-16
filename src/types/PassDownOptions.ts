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
     * Whether an element is inside a block-element.
     *
     * Mainly used to determine if a HTML-in-markdown conversion should
     * add extra trailing-newlines.
     */
    isInsideBlockElement: boolean
}
