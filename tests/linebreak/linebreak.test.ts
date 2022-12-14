import { HTMLarkdown } from '../../src'
import { getTestPairHOF } from '../helpers'

const getTestPair = getTestPairHOF(__dirname)

describe('Linebreak', () => {
    test.concurrent('paragraph', async () => {
        const htmlarkdown = new HTMLarkdown()
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./paragraph')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })

    test.concurrent('heading', async () => {
        const htmlarkdown = new HTMLarkdown()
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./heading')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })

    test.concurrent('paragraph (trailing linebreak)', async () => {
        const htmlarkdown = new HTMLarkdown({ addTrailingLinebreak: true })
        const [htmlInput, expectedMarkdownOutput] = await getTestPair(
            './paragraphTrailingLinebreak'
        )
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })

    test.concurrent('heading (trailing linebreak)', async () => {
        const htmlarkdown = new HTMLarkdown({ addTrailingLinebreak: true })
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./headingTrailingLinebreak')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })
})
