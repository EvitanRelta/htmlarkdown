import { any } from 'predicate-hof'
import type { ToUseHtmlPredicate } from '../../types'
import { hasAnyOfAttributes } from '../elementPredicates'

const obeyForceHtmlOption: ToUseHtmlPredicate = (_, __, parentOptions) => parentOptions.forceHtml

export const obeyForceHtml: ToUseHtmlPredicate = any(
    obeyForceHtmlOption,
    hasAnyOfAttributes(['forcehtml'])
)
