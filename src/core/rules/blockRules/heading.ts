import { any } from 'predicate-hof'
import type { RuleWithHTML } from '../../../types'
import {
    blockTagNames,
    hasAnyOfAttributes,
    isHeading,
    obeyForceHtml,
    toSanitisedHtmlHOF,
} from '../../../utilities'
import { getBlockTrailingNewline } from '../helpers'

const blockTagsExceptHr = blockTagNames.filter((x) => x !== 'HR')
const isBlockExceptHr = (node: Node) => blockTagsExceptHr.includes(node.nodeName)
const hasBlockElements = (element: Element): boolean => {
    const children = Array.from(element.children)
    return children.some(isBlockExceptHr) || children.some(hasBlockElements)
}

export const heading: RuleWithHTML = {
    filter: [isHeading],
    toUseHtmlPredicate: any(obeyForceHtml, hasAnyOfAttributes(['align']), hasBlockElements),
    replacement: (element, _, parentOptions) => ({
        childOptions: { isInsideBlockElement: true },
        value: (innerContent) => {
            const headingLevel = Number(element.tagName[1])
            const prefix = '#'.repeat(headingLevel)
            return `${prefix} ${innerContent}` + getBlockTrailingNewline(parentOptions)
        },
    }),
    htmlReplacement: (element, _, parentOptions) => ({
        childOptions: { forceHtml: true, isInsideBlockElement: true },
        value: toSanitisedHtmlHOF(element, ['align'], !parentOptions.isInsideBlockElement),
    }),
}
