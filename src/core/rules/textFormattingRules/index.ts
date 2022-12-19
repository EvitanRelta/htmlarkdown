import type { Rule } from '../../../types'
import { bold } from './bold'
import { code } from './code'
import { italic } from './italic'
import { strikethrough } from './strikethrough'
import { subscript } from './subscript'
import { superscript } from './superscript'
import { underline } from './underline'

export const textFormattingRules: Rule[] = [
    underline,
    subscript,
    superscript,
    strikethrough,
    code,
    italic,
    bold,
]
