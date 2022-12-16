/**
 * Checks that input 'container' element is not mutated by the conversion.
 */

import { HTMLarkdown, Preprocess, Rule } from '../../src'

const isEmptyParagraphMutated = (htmlarkdown: HTMLarkdown) => {
    const container = document.createElement('div')
    const emptyParagraph = document.createElement('p')
    container.appendChild(emptyParagraph)

    htmlarkdown.convert(container)
    const isNotEmptyAnymore = emptyParagraph.hasChildNodes()
    return isNotEmptyAnymore
}

/** Test whether the input element is mutated by preprocessing. */
test.concurrent('Immutability - preprocess', async () => {
    const insertLinebreak: Preprocess = (container) =>
        container.firstChild!.appendChild(document.createElement('br'))

    const htmlarkdown = new HTMLarkdown()
    htmlarkdown.preprocesses = [insertLinebreak]
    htmlarkdown.rules = []

    expect(isEmptyParagraphMutated(htmlarkdown)).toBe(false)
})

/** Test whether the input element is mutated by rules. */
test.concurrent('Immutability - rule', async () => {
    const insertLinebreak: Rule = {
        filter: ['p'],
        replacement: (element) => {
            element.appendChild(document.createElement('br'))
            return ''
        },
    }

    const htmlarkdown = new HTMLarkdown()
    htmlarkdown.preprocesses = []
    htmlarkdown.rules = [insertLinebreak]

    expect(isEmptyParagraphMutated(htmlarkdown)).toBe(false)
})
