import { HTMLarkdown } from '../../src'
import { getTestPairHOF } from '../helpers'

const getTestPair = getTestPairHOF(__dirname)

test.concurrent('Heading - basic', async () => {
    const htmlarkdown = new HTMLarkdown()
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./basic')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test.concurrent('Heading - align', async () => {
    const htmlarkdown = new HTMLarkdown()
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./align')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test.concurrent('Heading - attribute sanitisation', async () => {
    const htmlarkdown = new HTMLarkdown()
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./attributeSanitisation')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test.concurrent('Heading - empty', async () => {
    const htmlarkdown = new HTMLarkdown()
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./empty')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test.concurrent('Heading - only linebreaks', async () => {
    const htmlarkdown = new HTMLarkdown()
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./onlyLinebreaks')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test.concurrent('Heading - linebreak with text', async () => {
    const htmlarkdown = new HTMLarkdown()
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./linebreakWithText')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})
