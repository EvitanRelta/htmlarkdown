import type { RuleWOHTML } from '../../types'

export const subscript: RuleWOHTML = {
    filter: ['sub'],
    replacement: () => (innerContent) => `<sub>${innerContent}</sub>`,
}
