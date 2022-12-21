import { HTMLarkdown } from '../../src'
import { getTestPairHOF } from '../helpers'

const getTestPair = getTestPairHOF(__dirname)

describe('Code & Codeblock', () => {
    test.concurrent('code', async () => {
        const htmlarkdown = new HTMLarkdown()
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./code')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })

    test.concurrent('codeblock', async () => {
        const htmlarkdown = new HTMLarkdown()
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./codeblock')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })

    test.concurrent('empty', async () => {
        const htmlarkdown = new HTMLarkdown()
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./empty')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })

    test.concurrent('empty (trailing linebreak)', async () => {
        const htmlarkdown = new HTMLarkdown({ addTrailingLinebreak: true })
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./emptyTrailingLinebreak')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })
})
