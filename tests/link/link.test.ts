import { HTMLarkdown } from '../../src'
import { absoluteFrom, relativeTo } from '../../src/utilities'
import { getTestPairHOF } from '../helpers'

const getTestPair = getTestPairHOF(__dirname)
const htmlarkdown = new HTMLarkdown()

test('Link - basic', () => {
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./basic')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test('Link - relative link', () => {
    const htmlarkdown = new HTMLarkdown({
        urlTransformer: relativeTo('https://base.url/A/'),
    })
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./relative')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test('Link - absolute link', () => {
    const htmlarkdown = new HTMLarkdown({
        urlTransformer: absoluteFrom('https://base.url/A/'),
    })
    const [htmlInput, expectedMarkdownOutput] = getTestPair('./absolute')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})
