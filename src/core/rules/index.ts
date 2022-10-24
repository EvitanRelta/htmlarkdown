import { bold } from './bold'
import { code } from './code'
import { codeblock } from './codeblock'
import { codeblockInner } from './codeblockInner'
import { heading } from './heading'
import { horizontalRule } from './horizontalRule'
import { image } from './image'
import { italic } from './italic'
import { linebreak } from './linebreak'
import { link } from './link'
import { paragraph } from './paragraph'
import { strikethrough } from './strikethrough'
import { subscript } from './subscript'
import { superscript } from './superscript'
import { underline } from './underline'

export const rules = [
    paragraph,
    linebreak,
    heading,
    bold,
    italic,
    underline,
    strikethrough,
    superscript,
    subscript,
    horizontalRule,
    code,
    codeblock,
    codeblockInner,
    link,
    image,
]
