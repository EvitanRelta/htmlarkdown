import type { HTMLarkdownOptions } from './HTMLarkdownOptions'

export type TagName = keyof HTMLElementTagNameMap
export type FilterPredicate = (element: Element, options: HTMLarkdownOptions) => boolean
export type Filter = TagName | TagName[] | FilterPredicate

export type ContentAddonFunction = (innerContent: string) => string
export type ReplacementFunction = (
    element: Element,
    options: HTMLarkdownOptions
) => ContentAddonFunction | string

export interface RuleWOHTML {
    filter: Filter | Filter[]
    replacement: ReplacementFunction
}
export interface RuleWithHTML extends RuleWOHTML {
    toUseHtmlPredicate: FilterPredicate
    htmlReplacement: ReplacementFunction
}
export type Rule = RuleWithHTML | RuleWOHTML
