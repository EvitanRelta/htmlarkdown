import { HTMLarkdown } from '../../src'
import { getTestPairHOF } from '../helpers'

const getTestPair = getTestPairHOF(__dirname)

test.concurrent('Code & Codeblock - code', async () => {
    const htmlarkdown = new HTMLarkdown()
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./code')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test.concurrent('Code & Codeblock - codeblock', async () => {
    const htmlarkdown = new HTMLarkdown()
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./codeblock')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})
