import { HTMLarkdown } from '../../src'
import { getTestPairHOF } from '../helpers'

const getTestPair = getTestPairHOF(__dirname)

describe('Paragraph', () => {
    test.concurrent('basic', async () => {
        const htmlarkdown = new HTMLarkdown()
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./basic')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })

    test.concurrent('align', async () => {
        const htmlarkdown = new HTMLarkdown()
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./align')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })

    test.concurrent('attribute sanitisation', async () => {
        const htmlarkdown = new HTMLarkdown()
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./attributeSanitisation')
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
