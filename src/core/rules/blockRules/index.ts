import { blockquote } from './blockquote'
import { codeblock } from './codeblock'
import { codeblockInner } from './codeblockInner'
import { heading } from './heading'
import { horizontalRule } from './horizontalRule'
import { paragraph } from './paragraph'

export const blockRules = [
    paragraph,
    heading,
    horizontalRule,
    codeblock,
    codeblockInner,
    blockquote,
]
