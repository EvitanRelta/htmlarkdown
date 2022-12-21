import { HTMLarkdown } from '../../src'
import { getTestPairHOF } from '../helpers'

const getTestPair = getTestPairHOF(__dirname)

describe('Text Formatting', () => {
    test.concurrent('basic', async () => {
        const htmlarkdown = new HTMLarkdown()
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./basic')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })

    test.concurrent('empty', async () => {
        const htmlarkdown = new HTMLarkdown()
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./empty')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })

    test.concurrent('(Bug) Issue #1', async () => {
        const htmlarkdown = new HTMLarkdown()
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./bug-1')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })

    test.concurrent('empty (trailing linebreak)', async () => {
        const htmlarkdown = new HTMLarkdown({ addTrailingLinebreak: true })
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./emptyTrailingLinebreak')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })

    test.concurrent('horizontal-rule only', async () => {
        const htmlarkdown = new HTMLarkdown({ addTrailingLinebreak: true })
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./horizontalRuleOnly')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })
})
