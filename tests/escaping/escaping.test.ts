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

test('Escaping - whitespace w/o collapse', () => {
    const htmlarkdown = new HTMLarkdown({ elementsNoWhitespaceCollapse: 'all' })
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./whitespaceWithoutCollapse')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test('Escaping - whitespace collapse', () => {
    const htmlarkdown = new HTMLarkdown({ elementsNoWhitespaceCollapse: ['pre', 'h1'] })
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./whitespaceCollapse')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})
