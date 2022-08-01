import { HTMLarkdown } from '../../src'
import { getTestPairHOF } from '../helpers'

const getTestPair = getTestPairHOF(__dirname)
const htmlarkdown = new HTMLarkdown()

test('Heading - basic', () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./basic')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test('Heading - align', () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./align')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test('Heading - attribute sanitisation', () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./attributeSanitisation')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test('Heading - empty', () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./empty')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test('Heading - only linebreaks', () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./onlyLinebreaks')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test('Heading - linebreak with text', () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./linebreakWithText')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})
