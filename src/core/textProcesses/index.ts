import type { TextProcess } from '../../types'
import { escapeMarkdown } from './escapeMarkdown'
import { escapeWhitespace } from './escapeWhitespace'
import { htmlEscapeSpaces } from './htmlEscapeSpaces'

export const textProcesses: TextProcess[] = [escapeMarkdown, htmlEscapeSpaces, escapeWhitespace]
