/** Returns `true` if element a heading element _(eg. `<h1>`, `<h6>`)_. */
export const isHeading = (element: Element) => /^H[0-6]$/.test(element.tagName)
