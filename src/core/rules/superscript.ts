import type { Rule } from '../../types'

export const superscript: Rule = {
    filter: ['sup'],
    replacement: () => (innerContent) => `<sup>${innerContent}</sup>`,
}
