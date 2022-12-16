import type { HTMLarkdownOptions } from './HTMLarkdownOptions'
import type { PassDownOptions } from './PassDownOptions'

export type TagName = keyof HTMLElementTagNameMap
export type FilterPredicate = (element: Element, options: HTMLarkdownOptions) => boolean
export type FilterAnd = (TagName | FilterPredicate)[]
export type FilterOr = (TagName | FilterPredicate | FilterAnd)[]

export type ContentAddonFunction = (innerContent: string) => string
export interface ReplacementObj {
    childOptions?: Partial<PassDownOptions>
    value: ContentAddonFunction | string
}
export type ReplacementFunction = (
    element: Element,
    options: HTMLarkdownOptions,
    parentOptions: PassDownOptions
) => string | ContentAddonFunction | ReplacementObj

export interface RuleWOHTML {
    filter: FilterOr
    replacement: ReplacementFunction
}
export type ToUseHtmlPredicate = (
    element: Element,
    options: HTMLarkdownOptions,
    parentOptions: PassDownOptions
) => boolean
export interface RuleWithHTML extends RuleWOHTML {
    toUseHtmlPredicate: ToUseHtmlPredicate
    htmlReplacement: ReplacementFunction
}
export type Rule = RuleWithHTML | RuleWOHTML
