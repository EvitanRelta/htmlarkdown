import type { RuleWOHTML } from '../../types'

export const superscript: RuleWOHTML = {
    filter: 'sup',
    replacement: () => (innerContent) => `<sup>${innerContent}</sup>`,
}
