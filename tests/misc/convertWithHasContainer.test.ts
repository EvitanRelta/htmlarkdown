import { HTMLarkdown } from '../../src'

test.concurrent('Convert with hasContainer set to true', async () => {
    const htmlarkdown = new HTMLarkdown()
    const htmlString = `
        <h1>Heading</h1>
        <p>Paragraph</p>
    `
    // Using '<article>' as container, as it doesn't have an associated rule
    // and is thus stripped if it's not the container.
    const htmlStrWithContainer = `<article>${htmlString}</article>`
    expect(htmlarkdown.convert(htmlStrWithContainer)).toBe('')
    expect(htmlarkdown.convert(htmlStrWithContainer, true)).toBe('# Heading\n\nParagraph')
})
