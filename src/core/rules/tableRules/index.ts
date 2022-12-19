import { table } from './table'
import { tableCell } from './tableCell'
import { tableNoop } from './tableNoop'
import { tableRow } from './tableRow'

export const tableRules = [table, tableNoop, tableRow, tableCell]
