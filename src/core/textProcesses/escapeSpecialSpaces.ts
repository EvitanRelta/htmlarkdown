import type { TextProcess } from '../../types'
import { applyReplacement, ReplacementArray } from './helpers/applyReplacement'

const specialSpaceEscapings: ReplacementArray = [
    ['\u2003', '&emsp;'],
    ['\u2002', '&ensp;'],
    ['\u2009', '&thinsp;'],
    ['\u200A', '&hairsp;'],

    // Converts non-breaking space to space for to be handled later in
    // `escapeWhitespace`, which will escape them into "&nbsp;".
    ['\u00A0', ' '],
]

export const escapeSpecialSpaces: TextProcess = (text) => {
    return applyReplacement(specialSpaceEscapings, text)
}
