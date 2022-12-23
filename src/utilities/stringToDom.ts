/**
 * Parse a string, that contains HTML source-code, into a DOM.
 * @param htmlString String containing HTML source-code.
 * @returns DOM generated using `htmlString`.
 */
export const stringToDom = (htmlString: string): Element => {
    const parser = new DOMParser()
    return parser.parseFromString(htmlString, 'text/html').body
}
