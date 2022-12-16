/**
 * A DOM text-node.
 * Subtype of `Text`, but with some properties narrowed down to that of a text-node.
 *
 * **Specifically:**
 * - `nodeType` is `3`
 * - `nodeName` is `"#text"`
 * - `firstChild` is type `null`
 * - `lastChild` is type `null`
 * - `nodeValue` is type `string`
 * - `textContent` is type `string`
 * - `splitText` method returns another `TextNode`
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
