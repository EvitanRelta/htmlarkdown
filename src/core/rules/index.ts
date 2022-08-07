import { bold } from './bold'
import { emptyParagraph } from './emptyParagraph'
import { heading } from './heading'
import { italic } from './italic'
import { linebreak } from './linebreak'
import { paragraph } from './paragraph'
import { strikethrough } from './strikethrough'
import { subscript } from './subscript'
import { superscript } from './superscript'
import { underline } from './underline'

export const rules = [
    paragraph,
    emptyParagraph,
    linebreak,
    heading,
    bold,
    italic,
    underline,
    strikethrough,
    superscript,
    subscript,
]
