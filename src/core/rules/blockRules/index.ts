import type { Rule } from '../../../types'
import { blockquote } from './blockquote'
import { codeblock } from './codeblock'
import { codeblockInner } from './codeblockInner'
import { heading } from './heading'
import { horizontalRule } from './horizontalRule'
import { paragraph } from './paragraph'

export const blockRules: Rule[] = [
    horizontalRule,
    codeblock,
    codeblockInner,
    blockquote,
    heading,
    paragraph,
]
