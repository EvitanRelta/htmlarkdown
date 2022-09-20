import type { Rule } from '../../types'

export const underline: Rule = {
    filter: ['u', 'ins'],
    replacement: () => (innerContent) => `<ins>${innerContent}</ins>`,
}
