import { HTMLarkdown } from '../../src'
import { absoluteFrom, relativeTo } from '../../src/utilities'
import { getTestPairHOF } from '../helpers'

const getTestPair = getTestPairHOF(__dirname)

describe('Link', () => {
    test.concurrent('basic', async () => {
        const htmlarkdown = new HTMLarkdown()
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./basic')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })

    test.concurrent('relative link', async () => {
        const htmlarkdown = new HTMLarkdown({
            urlTransformer: relativeTo('https://base.url/A/'),
        })
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./relative')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })

    test.concurrent('absolute link', async () => {
        const htmlarkdown = new HTMLarkdown({
            urlTransformer: absoluteFrom('https://base.url/A/'),
        })
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./absolute')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })

    test.concurrent('reverse autolink', async () => {
        const htmlarkdown = new HTMLarkdown()
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./reverseAutolink')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })

    test.concurrent('disabled reverse-autolink', async () => {
        const htmlarkdown = new HTMLarkdown({
            reverseAutolinks: { textUrls: false, images: false },
        })
        const [htmlInput, expectedMarkdownOutput] = await getTestPair('./disabledReverseAutolink')
        const outputMarkdown = htmlarkdown.convert(htmlInput)
        expect(outputMarkdown).toBe(expectedMarkdownOutput)
    })
})
