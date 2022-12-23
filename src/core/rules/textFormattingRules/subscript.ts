import type { RuleWOHTML } from '../../../types'

export const subscript: RuleWOHTML = {
    filter: ['sub'],
    replacement: (element) =>
        element.hasAttribute('forcehtml')
            ? {
                  childOptions: { forceHtml: true },
                  value: (innerContent) => `<sub>${innerContent}</sub>`,
              }
            : (innerContent) => `<sub>${innerContent}</sub>`,
}
