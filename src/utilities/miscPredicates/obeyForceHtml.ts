import type { ToUseHtmlPredicate } from '../../types'

export const obeyForceHtml: ToUseHtmlPredicate = (_, __, parentOptions) => parentOptions.forceHtml
