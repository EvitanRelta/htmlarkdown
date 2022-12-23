import type { RuleWOHTML } from '../../../types'

export const underline: RuleWOHTML = {
    filter: ['u', 'ins'],
    replacement: (element) =>
        element.hasAttribute('forcehtml')
            ? {
                  childOptions: { forceHtml: true },
                  value: (innerContent) => `<ins>${innerContent}</ins>`,
              }
            : (innerContent) => `<ins>${innerContent}</ins>`,
}
