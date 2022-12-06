import { HTMLarkdown } from '../../src'
import { getTestPairHOF } from '../helpers'

const getTestPair = getTestPairHOF(__dirname)

test.concurrent('Escaping - basic markdown', async () => {
    const htmlarkdown = new HTMLarkdown()
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./basicMarkdown')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test.concurrent('Escaping - advanced markdown', async () => {
    const htmlarkdown = new HTMLarkdown()
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./advancedMarkdown')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test.concurrent('Escaping - HTML-escaped spaces', async () => {
    const htmlarkdown = new HTMLarkdown()
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./htmlEscapedSpaces')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test.concurrent('Escaping - whitespace w/o collapse', async () => {
    const htmlarkdown = new HTMLarkdown({ elementsNoWhitespaceCollapse: 'all' })
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./whitespaceWithoutCollapse')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test.concurrent('Escaping - whitespace collapse', async () => {
    const htmlarkdown = new HTMLarkdown({ elementsNoWhitespaceCollapse: ['pre', 'h1'] })
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./whitespaceCollapse')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})
