import type { RuleWOHTML } from '../../types'

export const underline: RuleWOHTML = {
    filter: ['u', 'ins'],
    replacement: () => (innerContent) => `<ins>${innerContent}</ins>`,
}
