import { HTMLarkdown } from '../../src'
import { getTestPairHOF } from '../helpers'

const getTestPair = getTestPairHOF(__dirname)
const htmlarkdown = new HTMLarkdown()

test('Code & Codeblock - code', () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./code')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test('Code & Codeblock - codeblock', () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./codeblock')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})
