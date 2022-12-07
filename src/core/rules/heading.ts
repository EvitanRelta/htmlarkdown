import { any } from 'predicate-hof'
import type { RuleWithHTML } from '../../types'
import {
    hasAnyOfAttributes,
    isBlock,
    isHeading,
    obeyForceHtml,
    toSanitisedHtmlHOF,
} from '../../utilities'

const hasBlockElements = (element: Element): boolean => {
    const children = Array.from(element.children)
    return children.some(isBlock) || children.some(hasBlockElements)
}

export const heading: RuleWithHTML = {
    filter: isHeading,
    toUseHtmlPredicate: any(obeyForceHtml, hasAnyOfAttributes(['align']), hasBlockElements),
    replacement: (element) => (innerContent) => {
        const headingLevel = Number(element.tagName[1])
        const prefix = '#'.repeat(headingLevel)
        return `${prefix} ${innerContent}\n\n`
    },
    htmlReplacement: (element) => ({
        childOptions: { forceHtml: true },
        value: toSanitisedHtmlHOF(element, ['align']),
    }),
}
