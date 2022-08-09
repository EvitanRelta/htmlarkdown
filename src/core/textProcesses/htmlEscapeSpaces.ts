import type { TextProcess } from '../../types'
import { applyReplacement, ReplacementArray } from './helpers/applyReplacement'

const spaceHtmlEscapings: ReplacementArray = [
    ['\u2003', '&emsp;'],
    ['\u2002', '&ensp;'],
    ['\u00A0', '&nbsp;'],
    ['\u2009', '&thinsp;'],
    ['\u200A', '&hairsp;'],
]

export const htmlEscapeSpaces: TextProcess = (text) => {
    return applyReplacement(spaceHtmlEscapings, text)
}
