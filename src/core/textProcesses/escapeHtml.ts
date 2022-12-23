import type { TextProcess } from '../../types'
import { applyReplacement, ReplacementArray } from './helpers/applyReplacement'

/** The bare minimum of characters that MUST be escaped for HTML. */
const conservativeHtmlEscapings: ReplacementArray = [
    [/&(?=#[0-9]|#x\w|\w)/g, '&amp;'],
    [/<(?=[!?/a-z])/gi, '&lt;'],
]

/** The 3 characters that MUST be escaped for HTML. */
const htmlEscapings: ReplacementArray = [
    ['&', '&amp;'],
    ['<', '&lt;'],
    ['>', '&gt;'],
]

/** The characters that SHOULD to be escaped for HTML. _(includes " and ')_ */
const fullHtmlEscapings: ReplacementArray = [...htmlEscapings, ['"', '&quot;'], ["'", '&#39;']]

/** Escapes characters for HTML _(eg. `&` escapes to `&amp;`, `<` escapes to `&lt;`)_. */
export const escapeHtml: TextProcess = (text, _, options, parentOptions) => {
    // Only run when 'parentOptions.forceHtml' is true.
    if (!parentOptions.forceHtml) return text

    switch (options.htmlEscapingMode) {
        case 'conservative':
            return applyReplacement(conservativeHtmlEscapings, text)
        case '&<>':
            return applyReplacement(htmlEscapings, text)
        case '&<>"\'':
            return applyReplacement(fullHtmlEscapings, text)
    }
}
