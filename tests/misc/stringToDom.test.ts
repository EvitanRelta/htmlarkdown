/**
 * Checks whether the 'stringToDom' utility function converts properly.
 */

import { stringToDom } from '../../src'

test.concurrent('String-to-DOM conversion', async () => {
    const htmlString = '<h1>Title</h1>\n<p>Paragraph 1</p>\n\n<p>Paragraph 2\n<br>\n</p>'
    expect(stringToDom(htmlString).innerHTML).toBe(htmlString)
})
