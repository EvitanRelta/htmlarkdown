import { HTMLarkdown } from '../../src'
import { getTestPairHOF } from '../helpers'

const getTestPair = getTestPairHOF(__dirname)

describe('Escaping', () => {
    test.concurrent('basic markdown', async () => {
        const htmlarkdown = new HTMLarkdown()
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./basicMarkdown')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })

    test.concurrent('advanced markdown', async () => {
        const htmlarkdown = new HTMLarkdown()
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./advancedMarkdown')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })

    test.concurrent('HTML-escaped spaces', async () => {
        const htmlarkdown = new HTMLarkdown()
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./htmlEscapedSpaces')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })

    test.concurrent('whitespace w/o collapse', async () => {
        const htmlarkdown = new HTMLarkdown({ elementsNoWhitespaceCollapse: 'all' })
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./whitespaceWithoutCollapse')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })

    test.concurrent('whitespace collapse', async () => {
        const htmlarkdown = new HTMLarkdown({ elementsNoWhitespaceCollapse: ['pre', 'h1'] })
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./whitespaceCollapse')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })

    test.concurrent('whitespace collapse (trailing linebreak)', async () => {
        const htmlarkdown = new HTMLarkdown({
            elementsNoWhitespaceCollapse: ['pre', 'h1'],
            addTrailingLinebreak: true,
        })
        const [htmlInput, expectedMarkdownOutput] = await getTestPair(
            './whitespaceCollapseTrailingLinebreak'
        )
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })

    test.concurrent('escape HTML (conservative)', async () => {
        const htmlarkdown = new HTMLarkdown()
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./escapeHtmlConservative')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })

    test.concurrent('escape HTML', async () => {
        const htmlarkdown = new HTMLarkdown({ htmlEscapingMode: '&<>' })
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./escapeHtml')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })

    test.concurrent('escape HTML (full)', async () => {
        const htmlarkdown = new HTMLarkdown({ htmlEscapingMode: '&<>"\'' })
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./escapeHtmlFull')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })
})
