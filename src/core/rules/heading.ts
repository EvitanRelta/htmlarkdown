import type { Rule } from '../../types'
import { hasAnyOfAttributes, isHeading, toSanitizedHtmlHOF } from '../../utilities'

export const heading: Rule = {
    filter: isHeading,
    toUseHtmlPredicate: (element) => hasAnyOfAttributes(element, ['align']),
    replacement: (element) => (innerContent) => {
        const headingLevel = Number(element.tagName[1])
        const prefix = '#'.repeat(headingLevel)
        return `${prefix} ${innerContent}\n\n`
    },
    htmlReplacement: (element) => toSanitizedHtmlHOF(element, ['align']),
}
