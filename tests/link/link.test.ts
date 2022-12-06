import { HTMLarkdown } from '../../src'
import { absoluteFrom, relativeTo } from '../../src/utilities'
import { getTestPairHOF } from '../helpers'

const getTestPair = getTestPairHOF(__dirname)

test.concurrent('Link - basic', async () => {
    const htmlarkdown = new HTMLarkdown()
    const [htmlInput, expectedMarkdownOutput] = await getTestPair('./basic')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test.concurrent('Link - relative link', async () => {
    const htmlarkdown = new HTMLarkdown({
        urlTransformer: relativeTo('https://base.url/A/'),
    })
    const [htmlInput, expectedMarkdownOutput] = await getTestPair('./relative')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test.concurrent('Link - absolute link', async () => {
    const htmlarkdown = new HTMLarkdown({
        urlTransformer: absoluteFrom('https://base.url/A/'),
    })
    const [htmlInput, expectedMarkdownOutput] = await getTestPair('./absolute')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test.concurrent('Link - reverse autolink', async () => {
    const htmlarkdown = new HTMLarkdown()
    const [htmlInput, expectedMarkdownOutput] = await getTestPair('./reverseAutolink')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})

test.concurrent('Link - disabled reverse-autolink', async () => {
    const htmlarkdown = new HTMLarkdown({ reverseAutolinks: { textUrls: false, images: false } })
    const [htmlInput, expectedMarkdownOutput] = await getTestPair('./disabledReverseAutolink')
    const outputMarkdown = htmlarkdown.convert(htmlInput)
    expect(outputMarkdown).toBe(expectedMarkdownOutput)
})
