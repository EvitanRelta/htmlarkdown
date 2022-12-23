import type { TextProcess } from '../../types'
import { applyReplacement, ReplacementArray } from './helpers/applyReplacement'

const spaceHtmlEscapings: ReplacementArray = [
    ['\u2003', '&emsp;'],
    ['\u2002', '&ensp;'],
    ['\u2009', '&thinsp;'],
    ['\u200A', '&hairsp;'],

    // Converts non-breaking space to space for escaping later in `escapeWhitespace`.
    // `escapeWhitespace` will escape leading/trailer/repeated spaces into "&nbsp;".
    ['\u00A0', ' '],
]

export const escapeSpecialSpaces: TextProcess = (text) => {
    return applyReplacement(spaceHtmlEscapings, text)
}
