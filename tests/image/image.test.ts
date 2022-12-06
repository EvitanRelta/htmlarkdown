import { HTMLarkdown } from '../../src'
import { getTestPairHOF } from '../helpers'

const getTestPair = getTestPairHOF(__dirname)

test.concurrent('Image - basic', async () => {
    const htmlarkdown = new HTMLarkdown()
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./basic')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test.concurrent('Image - with height/width', async () => {
    const htmlarkdown = new HTMLarkdown()
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./withHeightOrWidth')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})
