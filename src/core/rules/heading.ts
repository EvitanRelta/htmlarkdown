import type { Rule } from '../../types'
import { hasAnyOfAttributes, isHeading, toSanitisedHtmlHOF } from '../../utilities'

export const heading: Rule = {
    filter: isHeading,
    toUseHtmlPredicate: hasAnyOfAttributes(['align']),
    replacement: (element) => (innerContent) => {
        const headingLevel = Number(element.tagName[1])
        const prefix = '#'.repeat(headingLevel)
        return `${prefix} ${innerContent}\n\n`
    },
    htmlReplacement: (element) => toSanitisedHtmlHOF(element, ['align']),
}
