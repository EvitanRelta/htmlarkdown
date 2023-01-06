import type { HTMLarkdownOptions } from './HTMLarkdownOptions'
import type { PassDownOptions } from './PassDownOptions'

/**
 * All possible element tag-names.
 *
 * _**Note:** They are all **LOWERCASE**, not uppercase like in `Element.tagName`_.
 */
export type TagName = keyof HTMLElementTagNameMap

/**
 * Predicate to filter out elements.
 * @param element The element to be checked.
 * @param options Options from the `HTMLarkdown` instance.
 * @returns Whether the rule applies to the element.
 */
export type FilterPredicate = (element: Element, options: HTMLarkdownOptions) => boolean

/**
 * Array to filter out elements.  \
 * The elements are logically **AND** against each other.
 */
export type FilterAnd = (TagName | FilterPredicate)[]

/**
 * Array to filter out elements.  \
 * The elements are logically **OR** against each other.
 *
 * It can contain inner-arrays whose elements are logically AND against each
 * other.  \
 * *(ie. `[A, [B, C], D]` is logically "A or (B and C) or D")*
 */
export type FilterOr = (TagName | FilterPredicate | FilterAnd)[]

/**
 * Function to transform the markdown-string from the child nodes.
 *
 * It's one of the return-types for the `ReplacementFunction` type;  \
 * used to "add-on" to the child-nodes' markdown-conversion.
 * @param innerContent The converted markdown-string from the element's child-nodes.
 * @returns The markdown-string for the current element.
 */
export type ContentAddonFunction = (innerContent: string) => string

/**
 * Object to propagate some options down to the element's child-nodes.
 */
export interface ReplacementObj {
    /** `PassDownOptions` to propagate to the element's child nodes. */
    childOptions?: Partial<PassDownOptions>
    /**
     * The markdown-conversion for the element.
     *
     * Does not accept strings as that would mean the conversion stops recursing
     * on this element, and thus there would be no need to pass down any
     * child-options.
     */
    value: AllowedAttributes | ContentAddonFunction
}

/**
 * The allowed attributes for HTML-syntax.
 *
 * If this is returned by the rule's replacement function, the element will be
 * converted to HTML-syntax, with only the listed attributes from the element.
 */
export type AllowedAttributes = string[]

/**
 * Function to handle how an element is converted to markdown.
 *
 * **Can return either a:**
 * - **`string`:**
 *   - for conversions that are independent from the child-nodes' markdown
 * - **`ContentAddonFunction`:**
 *   - for conversions that depends on the child-nodes' markdown
 * - **`ReplacementObj`:**
 *   - for conversions that needs to update the options that's propagated to
 *     the child-nodes
 * @param element The element to be converted.
 * @param options Options from the `HTMLarkdown` instance.
 * @param parentOptions Options passed-down from the parent-element.
 * @returns The markdown-conversion for the element.
 */
export type ReplacementFunction = (
    element: Element,
    options: HTMLarkdownOptions,
    parentOptions: PassDownOptions
) => string | AllowedAttributes | ContentAddonFunction | ReplacementObj

/** Rule that has the same conversion for both markdown and HTML-in-markdown syntax. */
export interface RuleWOHTML {
    /**
     * An array that determines whether this rule applies to an element.
     *
     * The elements are logically **OR** against each other.
     *
     * **It can contain elements of type:**
     * - `TagName`
     *   - which checks if the element has said tag-name
     * - `FilterPredicate`
     *   - a predicate that takes in the element & the HTMLarkdown instance options
     * - `FilterAnd`
     *   - a array of `TagName` & `FilterPredicate`, which elements are **AND**
     *     against each other  \
     *     *(ie. `filter: [A, [B, C], D]` is logically "A or (B and C) or D")*
     */
    filter: FilterOr
    /** The function that handles how the filtered element is converted to markdown. */
    replacement: ReplacementFunction
}

/**
 * The predicate that determines if the element should be in markdown syntax or
 * HTML-in-markdown syntax
 * @param element The element to be converted.
 * @param options Options from the `HTMLarkdown` instance.
 * @param parentOptions Options passed-down from the parent-element.
 * @returns Whether to use HTML-in-markdown syntax.
 */
export type ToUseHtmlPredicate = (
    element: Element,
    options: HTMLarkdownOptions,
    parentOptions: PassDownOptions
) => boolean

/** Rule that has a different conversion for markdown vs HTML-in-markdown syntax. */
export interface RuleWithHTML extends RuleWOHTML {
    /**
     * The predicate that determines if the element should be in markdown
     * syntax or HTML-in-markdown syntax.
     */
    toUseHtmlPredicate: ToUseHtmlPredicate
    /**
     * The function that handles how the filtered element is converted to
     * HTML-in-markdown syntax.
     */
    htmlReplacement: ReplacementFunction
}

/**
 * Rules dictate how each element is converted to markdown.  \
 * They are ran after pre-processes, and together with text-processes.
 *
 * They can have `toUseHtmlPredicate` and `htmlReplacement` properties  \
 * which control when/how elements are converted to HTML-in-markdown syntax.
 */
export type Rule = RuleWithHTML | RuleWOHTML
