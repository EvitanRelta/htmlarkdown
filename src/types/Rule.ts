import type { HTMLarkdownOptions } from './HTMLarkdownOptions'
import type { PassDownOptions } from './PassDownOptions'

export type TagName = keyof HTMLElementTagNameMap
export type FilterPredicate = (element: Element, options: HTMLarkdownOptions) => boolean
export type Filter = TagName | TagName[] | FilterPredicate

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
    filter: Filter | Filter[]
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
