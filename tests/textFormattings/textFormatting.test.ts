import { HTMLarkdown } from '../../src'
import { getTestPairHOF } from '../helpers'

const getTestPair = getTestPairHOF(__dirname)
const htmlarkdown = new HTMLarkdown()

test('Text Formatting - basic', () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./basic')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test('Text Formatting - empty', () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./empty')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test('Text Formatting - leading trailing spaces', () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./leadingTrailingSpaces')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})
