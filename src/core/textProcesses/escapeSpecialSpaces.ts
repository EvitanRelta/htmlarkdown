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

/**
 * Escape the characters `\u2003`, `\u2002`, `\u2009`, `\u200A` to their
 * HTML-entities _(ie. `&emsp;`, `&ensp;`, `&thinsp;`, `&hairsp;`)_,   \
 * as well as escape `\u00A0` _(non-breaking space)_ to space `" "` which is
 * later handled/escaped to `&nbsp;` by `prettifySpaces` text-process.
 */
export const escapeSpecialSpaces: TextProcess = (text) => {
    return applyReplacement(specialSpaceEscapings, text)
}
