import type { Rule } from '../../../types'
import { blockquote } from './blockquote'
import { codeblock } from './codeblock'
import { codeblockInner } from './codeblockInner'
import { heading } from './heading'
import { paragraph } from './paragraph'

export const blockRules: Rule[] = [codeblock, codeblockInner, blockquote, heading, paragraph]
