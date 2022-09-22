import type { Rule } from '../../types'

export const subscript: Rule = {
    filter: 'sub',
    replacement: () => (innerContent) => `<sub>${innerContent}</sub>`,
}
