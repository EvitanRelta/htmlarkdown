import type { TextProcess } from '../../types'
import { escapeMarkdown } from './escapeMarkdown'

export const textProcesses: TextProcess[] = [escapeMarkdown]
