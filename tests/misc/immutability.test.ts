/**
 * Checks that input 'container' element is not mutated by the conversion.
 */

import type { PreProcess, Rule } from '../../src'
import { HTMLarkdown } from '../../src'

const isEmptyParagraphMutated = (htmlarkdown: HTMLarkdown) => {
    const container = document.createElement('div')
    const emptyParagraph = document.createElement('p')
    container.appendChild(emptyParagraph)

    htmlarkdown.convert(container)
    const isNotEmptyAnymore = emptyParagraph.hasChildNodes()
    return isNotEmptyAnymore
}

describe('Immutability', () => {
    /** Test whether the input element is mutated by pre-processing. */
    test.concurrent('pre-process', async () => {
        const insertLinebreak: PreProcess = (container) =>
            container.firstChild!.appendChild(document.createElement('br'))
        const htmlarkdown = new HTMLarkdown({ preProcesses: [insertLinebreak], rules: [] })
        expect(isEmptyParagraphMutated(htmlarkdown)).toBe(false)
    })

    /** Test whether the input element is mutated by rules. */
    test.concurrent('rule', async () => {
        const insertLinebreak: Rule = {
            filter: ['p'],
            replacement: (element) => {
                element.appendChild(document.createElement('br'))
                return ''
            },
        }
        const htmlarkdown = new HTMLarkdown({ preProcesses: [], rules: [insertLinebreak] })
        expect(isEmptyParagraphMutated(htmlarkdown)).toBe(false)
    })
})
