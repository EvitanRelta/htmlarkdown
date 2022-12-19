import { blockquote } from './blockquote'
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
import { noop } from './noop'
import { paragraph } from './paragraph'
import { strikethrough } from './strikethrough'
import { subscript } from './subscript'
import { superscript } from './superscript'
import { tableRules } from './tableRules'
import { underline } from './underline'

/**
 * Rules are checked starting from the **BACK** of the array to the front.
 *
 * This is so the newer rules *(added by the user)* that are pushed to the back
 * are prioritised.
 *
 * _**Note:** This is opposite of pre/text-processes, which are all evaluated
 * starting from the **FRONT**._
 */
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
    noop,
    blockquote,
    ...tableRules,
]
