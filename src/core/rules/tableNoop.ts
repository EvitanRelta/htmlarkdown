import type { RuleWOHTML } from '../../types'

export const tableNoop: RuleWOHTML = {
    filter: ['thead', 'tbody', 'tfoot'],
    replacement: () => (innerContent) => innerContent,
}
