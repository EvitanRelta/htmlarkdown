import type { TextProcess } from '../../types'
import { applyReplacement, ReplacementArray } from './helpers/applyReplacement'

/** The bare minimum of characters that MUST be escaped for HTML. */
const conservativeHtmlEscapings: ReplacementArray = [
    [/&(?=#[0-9]|#x\w|\w)/g, '&amp;'],
    [/<(?=[!?/a-z])/gi, '&lt;'],
]

/** Escapes characters for HTML _(eg. `&` escapes to `&amp;`, `<` escapes to `&lt;`)_. */
export const escapeHtml: TextProcess = (text, _, __, parentOptions) => {
    // Only run when 'parentOptions.forceHtml' is true.
    if (!parentOptions.forceHtml) return text
    return applyReplacement(conservativeHtmlEscapings, text)
}
