import type { Rule } from '../../../types'
import { link } from './link'
import { noop } from './noop'

export const miscRules: Rule[] = [noop, link]
