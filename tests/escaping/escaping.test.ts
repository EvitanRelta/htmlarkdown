import { HTMLarkdown } from '../../src'
import { getTestPairHOF } from '../helpers'

const getTestPair = getTestPairHOF(__dirname)
const htmlarkdown = new HTMLarkdown()

test('Escaping - basic markdown escapings', () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./basicMarkdown')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test('Escaping - advanced markdown escapings', () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./advancedMarkdown')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test('Escaping - space HTML escapings', () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./spaceHtml')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})
