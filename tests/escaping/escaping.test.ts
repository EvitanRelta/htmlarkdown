import { HTMLarkdown } from '../../src'
import { getTestPairHOF } from '../helpers'

const getTestPair = getTestPairHOF(__dirname)
const htmlarkdown = new HTMLarkdown()

test('Escaping - basic markdown', () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./basicMarkdown')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test('Escaping - advanced markdown', () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./advancedMarkdown')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test('Escaping - HTML-escaped spaces', () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./htmlEscapedSpaces')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test('Escaping - whitespace', () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./whitespace')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})
