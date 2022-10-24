import type { TextProcess } from '../../types'
import { collapseWhitespace } from './collapseWhitespace'
import { escapeMarkdown } from './escapeMarkdown'
import { escapeWhitespace } from './escapeWhitespace'
import { htmlEscapeSpaces } from './htmlEscapeSpaces'

export const textProcesses: TextProcess[] = [
    collapseWhitespace,
    escapeMarkdown,
    htmlEscapeSpaces,
    escapeWhitespace,
]
