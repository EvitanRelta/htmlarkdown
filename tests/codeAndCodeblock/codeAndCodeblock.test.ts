import { HTMLarkdown } from '../../src'
import { getTestPairHOF } from '../helpers'

const getTestPair = getTestPairHOF(__dirname)

test.concurrent('Code & Codeblock - code', async () => {
    const htmlarkdown = new HTMLarkdown()
    const [htmlInput, expectedMarkdownOutput] = await getTestPair('./code')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test.concurrent('Code & Codeblock - codeblock', async () => {
    const htmlarkdown = new HTMLarkdown()
    const [htmlInput, expectedMarkdownOutput] = await getTestPair('./codeblock')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test.concurrent('Code & Codeblock - empty', async () => {
    const htmlarkdown = new HTMLarkdown()
    const [htmlInput, expectedMarkdownOutput] = await getTestPair('./empty')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test.concurrent('Code & Codeblock - empty (trailing linebreak)', async () => {
    const htmlarkdown = new HTMLarkdown({ addTrailingLinebreak: true })
    const [htmlInput, expectedMarkdownOutput] = await getTestPair('./emptyTrailingLinebreak')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})
