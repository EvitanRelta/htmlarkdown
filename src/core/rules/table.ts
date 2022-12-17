import { any } from 'predicate-hof'
import type { RuleWithHTML } from '../../types'
import {
    childWillBeHtml,
    hasAnyOfAttributes,
    obeyForceHtml,
    toSanitisedHtmlHOF,
} from '../../utilities'

const getColumnMaxWidth = (rows: string[][]): number[] => {
    const numOfColumns = rows[0].length
    const numOfRows = rows.length
    const output = []
    for (let c = 0; c < numOfColumns; c++) {
        // minimum width of 1, as each column needs to width 3 (including the
        // leading/trailing spaces) for there to be >= 3 hypens in the header
        // separator.
        let maxColumnWidth = 1
        for (let r = 0; r < numOfRows; r++)
            maxColumnWidth = Math.max(rows[r][c].length, maxColumnWidth)
        output[c] = maxColumnWidth
    }
    return output
}

export const table: RuleWithHTML = {
    filter: ['table'],
    toUseHtmlPredicate: any(
        obeyForceHtml,
        hasAnyOfAttributes(['align', 'border', 'width', 'height']),
        childWillBeHtml
    ),
    replacement: (_, options) => (innerContent) => {
        const rows = innerContent
            .split('\n')
            .map((row) => row.split(' | ').slice(0, -1))
            .slice(0, -1) // last " | " and "\n" are trailing separators
        const maxColumnWidths = getColumnMaxWidth(rows)
        const numOfCellSeparators = maxColumnWidths.length + 1
        const cellSeparatorWidth = numOfCellSeparators * 3 - 2 // -2 as the 1st & last separator both lacks a space
        const tableWidth = maxColumnWidths.reduce((x, y) => x + y, 0) + cellSeparatorWidth

        if (tableWidth > options.maxPrettyTableWidth) {
            const strRows = rows.map((row) => '| ' + row.join(' | ') + ' |')
            const numOfColumns = rows[0].length
            const headerSeparator = '\n' + '|---'.repeat(numOfColumns) + '|\n'
            return strRows[0] + headerSeparator + strRows.slice(1).join('\n') + '\n\n'
        }

        const padRow = (row: string[]) =>
            '| ' + row.map((cell, i) => cell.padEnd(maxColumnWidths[i])).join(' | ') + ' |'
        const paddedRows = rows.map(padRow)
        const headerSeparator =
            '\n|' + maxColumnWidths.map((width) => '-'.repeat(width + 2)).join('|') + '|\n'
        return paddedRows[0] + headerSeparator + paddedRows.slice(1).join('\n') + '\n\n'
    },
    htmlReplacement: (element, _, parentOptions) => ({
        childOptions: { forceHtml: true, isInsideBlockElement: true },
        value: toSanitisedHtmlHOF(
            element,
            ['align', 'border', 'width', 'height'],
            !parentOptions.isInsideBlockElement
        ),
    }),
}
