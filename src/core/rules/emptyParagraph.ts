import type { Rule } from '../../types'
import { isEmpty } from '../../utilities'

export const emptyParagraph: Rule = {
    filter: ['p', isEmpty],
    replacement: (element) => '<p><br></p>\n\n',
}
