import { any } from 'predicate-hof'
import { Rule } from '../../types'
import { hasAnyOfAttributes, isHeading, obeyForceHtml, toSanitisedHtmlHOF } from '../../utilities'

export const heading: Rule = {
    filter: isHeading,
    toUseHtmlPredicate: any(obeyForceHtml, hasAnyOfAttributes(['align'])),
    replacement: (element) => (innerContent) => {
        const headingLevel = Number(element.tagName[1])
        const prefix = '#'.repeat(headingLevel)
        return `${prefix} ${innerContent}\n\n`
    },
    htmlReplacement: (element) => toSanitisedHtmlHOF(element, ['align']),
}
