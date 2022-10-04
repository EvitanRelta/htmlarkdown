import { HTMLarkdown } from '../../src'
import { getTestPairHOF } from '../helpers'

const getTestPair = getTestPairHOF(__dirname)
const htmlarkdown = new HTMLarkdown()

test('Image - basic', () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./basic')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test('Image - with height/width', () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./withHeightOrWidth')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})
