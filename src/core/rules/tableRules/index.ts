import type { Rule } from '../../../types'
import { table } from './table'
import { tableCell } from './tableCell'
import { tableNoop } from './tableNoop'
import { tableRow } from './tableRow'

export const tableRules: Rule[] = [table, tableNoop, tableRow, tableCell]
