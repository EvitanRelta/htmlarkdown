import type { Rule } from '../../types'
import { hasJustOneLinebreak } from '../../utilities'

// After the 'addExtraLinebreak' preprocessing, emptyParagraphs now have 1
// linebreak instead of being empty.
export const emptyParagraph: Rule = {
    filter: ['p', hasJustOneLinebreak],
    replacement: () => '<p><br></p>\n\n',
}
