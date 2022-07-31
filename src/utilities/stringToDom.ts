export const stringToDom = (htmlString: string): Element => {
    const parser = new DOMParser()
    return parser.parseFromString(htmlString, 'text/html').body
}
