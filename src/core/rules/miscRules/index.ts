import type { Rule } from '../../../types'
import { image } from './image'
import { linebreak } from './linebreak'
import { link } from './link'
import { noop } from './noop'

export const miscRules: Rule[] = [noop, image, link, linebreak]
