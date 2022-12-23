import type { RuleWOHTML } from '../../../types'

export const superscript: RuleWOHTML = {
    filter: ['sup'],
    replacement: (element) =>
        element.hasAttribute('forcehtml')
            ? {
                  childOptions: { forceHtml: true },
                  value: (innerContent) => `<sup>${innerContent}</sup>`,
              }
            : (innerContent) => `<sup>${innerContent}</sup>`,
}
