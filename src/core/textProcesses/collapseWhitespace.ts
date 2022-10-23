import type { TextProcess } from '../../types'
import { isInside } from '../../utilities'
import { applyReplacement, ReplacementArray } from './helpers/applyReplacement'

const whitespaceCollapsing: ReplacementArray = [[/[ \t\r\n]+/g, ' ']]
const isPre = (element: Element) => element.tagName === 'PRE'
const isInsidePre = isInside(isPre)

export const collapseWhitespace: TextProcess = (text, textNode) =>
    !isInsidePre(textNode.parentElement!) ? applyReplacement(whitespaceCollapsing, text) : text
