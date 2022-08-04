/**
 * A DOM text-node.
 * Subtype of `Text`, but with some properties narrowed down to that of a text-node.
 *
 * **Example:**
 * - `nodeType` is `3`
 * - `nodeValue` is `string`
 * - `firstChild` is `null`
 */
export interface TextNode extends Text {
    readonly nodeType: 3
    readonly nodeName: '#text'
    readonly firstChild: null
    readonly lastChild: null

    nodeValue: string
    textContent: string

    splitText(offset: number): TextNode
}
