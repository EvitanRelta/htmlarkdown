import type { Rule, TagName } from '../../types'

/**
 * Elements to keep, but have no specific conversions and just passes on their
 * `innerContent`.
 */
export const noopTags: TagName[] = ['div', 'span']

/**
 * Elements to keep, but have no specific conversions and just passes on their
 * `innerContent`.
 *
 * This is to prevent them from being stripped from the converted markdown.
 */
export const noop: Rule = {
    filter: noopTags,
    replacement: () => (innerContent) => innerContent,
}
