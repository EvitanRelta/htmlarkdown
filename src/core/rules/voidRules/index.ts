import type { Rule } from '../../../types'
import { horizontalRule } from './horizontalRule'
import { image } from './image'
import { linebreak } from './linebreak'

export const voidRules: Rule[] = [horizontalRule, image, linebreak]
