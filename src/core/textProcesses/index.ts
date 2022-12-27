import type { TextProcess } from '../../types'
import { addListItemTrailingNewline } from './addListItemTrailingNewline'
import { escapeBlankLines } from './escapeBlankLines'
import { escapeHtml } from './escapeHtml'
import { escapeMarkdown } from './escapeMarkdown'
import { escapeSpecialSpaces } from './escapeSpecialSpaces'
import { prettifySpaces } from './prettifySpaces'

/**
 * Text-processes are evaluated starting from the **BACK** of the array to the
 * front.
 *
 * This is so the newer text-processes *(added by the user)* can be pushed to
 * the back and prioritised.
 */
export const textProcesses: TextProcess[] = [
    escapeBlankLines,
    addListItemTrailingNewline,
    prettifySpaces,
    escapeSpecialSpaces,
    escapeHtml,
    escapeMarkdown,
]
