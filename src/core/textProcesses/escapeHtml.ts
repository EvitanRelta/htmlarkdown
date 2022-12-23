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

/**
 * Escape HTML-entities _(eg. `&`, `<`, etc.)_ in the text.  \
 * _(eg. `&` escapes to `&amp;`, `<` escapes to `&lt;`)_
 *
 * Controlled by the `PassDownOptions.escapeHtml` option.
 */
export const escapeHtml: TextProcess = (text, _, options, parentOptions) => {
    if (!parentOptions.escapeHtml) return text

    switch (options.htmlEscapingMode) {
        case 'conservative':
            return applyReplacement(conservativeHtmlEscapings, text)
        case '&<>':
            return applyReplacement(htmlEscapings, text)
        case '&<>"\'':
            return applyReplacement(fullHtmlEscapings, text)
    }
}
