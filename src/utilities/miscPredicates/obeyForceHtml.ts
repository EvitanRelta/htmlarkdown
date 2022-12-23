import { any } from 'predicate-hof'
import type { ToUseHtmlPredicate } from '../../types'
import { hasAnyOfAttributes } from '../elementPredicates'

const obeyForceHtmlOption: ToUseHtmlPredicate = (_, __, parentOptions) => parentOptions.forceHtml

/**
 * A `ToUseHtmlPredicate` that obeys both the `PassDownOptions.forceHtml` option
 * and `forcehtml` element attribute.
 */
export const obeyForceHtml: ToUseHtmlPredicate = any(
    obeyForceHtmlOption,
    hasAnyOfAttributes(['forcehtml'])
)
