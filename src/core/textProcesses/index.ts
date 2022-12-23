import type { TextProcess } from '../../types'
import { escapeHtml } from './escapeHtml'
import { escapeMarkdown } from './escapeMarkdown'
import { escapeWhitespace } from './escapeWhitespace'
import { htmlEscapeSpaces } from './htmlEscapeSpaces'
import { listItemTrailingNewline } from './listItemTrailingNewline'

/**
 * Text-processes are called starting from the FRONT of the array to the back.
 *
 * This is so the newer text-processes *(added by the user)* that are pushed to
 * the back are ran last \
 * *(as they're probably less important than the default pre-processes)*.
 *
 * _**Note:** This is opposite of rules, which is evaluated starting from the
 * **BACK**._
 */
export const textProcesses: TextProcess[] = [
    escapeMarkdown,
    escapeHtml,
    htmlEscapeSpaces,
    escapeWhitespace,
    listItemTrailingNewline,
]
