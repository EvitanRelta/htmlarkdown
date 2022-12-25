import type { IterableElement, PartialDeep } from 'type-fest'
import type {
    FilterAnd,
    FilterOr,
    FilterPredicate,
    HTMLarkdownOptions,
    PassDownOptions,
    Plugin,
    PostProcess,
    PreProcess,
    ReplacementFunction,
    ReplacementObj,
    Rule,
    TagName,
    TextNode,
    TextProcess,
} from '../types'
import { isElement, isTextNode, stringToDom } from '../utilities'
import { isRuleWithHtml, mergeOverwriteArray } from './helpers'
import { postProcesses } from './postProcesses'
import { preProcesses } from './preProcesses'
import { rules } from './rules'
import { textProcesses } from './textProcesses'

/**
 * A HTML-to-markdown converter class.
 *
 * It can output HTML-syntax when required.  \
 * _(eg. when there's `align` attribute in `<p>`, or `width` in `<img>`,  \
 * both of which cannot be expressed in markdown-syntax)_
 *
 * @example
 * // Convert an element.
 * const htmlarkdown = new HTMLarkdown()
 * const container = document.getElementById('container')
 * console.log(container.outerHTML)
 * // => '<div id="container"><h1>Heading</h1></div>'
 * htmlarkdown.convert(container)
 * // => '# Heading'
 *
 * @example
 * // Convert a HTML in string format.
 * const htmlarkdown = new HTMLarkdown()
 * const htmlString = `
 * <h1>Heading</h1>
 * <p>Paragraph</p>
 * `
 * const htmlStrWithContainer = `<div>${htmlString}</div>`
 * htmlarkdown.convert(htmlString)
 * htmlarkdown.convert(htmlStrWithContainer, true)
 * // Both output => '# Heading\n\nParagraph'
 *
 * @example
 * // Configuring options.
 * const htmlarkdown = new HTMLarkdown({
 *     htmlEscapingMode: '&<>',
 *     maxPrettyTableWidth: Number.POSITIVE_INFINITY,
 *     addTrailingLinebreak: true
 * })
 * htmlarkdown.options.maxPrettyTableWidth = -1
 *
 * @example
 * // Adding plugins.
 * const htmlarkdown = new HTMLarkdown({
 *     plugins: [myPlugin1, myPlugin2],
 *     preloadPlugins: [myPlugin3, myPlugin4]
 * })
 * htmlarkdown.loadPlugins([myPlugin5])
 *
 * @example
 * // Configuring rules/processes.
 * // Overwriting default rules/processes (does NOT include the defaults).
 * const htmlarkdown = new HTMLarkdown({
 *     preProcesses: [myPreProcess1, myPreProcess2],
 *     rules: [myRule1, myRule2],
 *     textProcesses: [myTextProcess1, myTextProcess2],
 *     postProcesses: [myPostProcess1, myPostProcess2]
 * })
 *
 * // Adding on to default rules/processes (includes the defaults).
 * const htmlarkdown = new HTMLarkdown()
 * htmlarkdown.addPreProcess(myPreProcess)
 * htmlarkdown.addRule(myRule)
 * htmlarkdown.addTextProcess(myTextProcess)
 * htmlarkdown.addPostProcess(myPostProcess)
 */
export class HTMLarkdown {
    /** The default rules to use. */
    static readonly defaultRules: readonly Rule[] = rules
    /** The default pre-processes to use. */
    static readonly defaultPreProcesses: readonly PreProcess[] = preProcesses
    /** The default text-processes to use. */
    static readonly defaultTextProcesses: readonly TextProcess[] = textProcesses
    /** The default post-processes to use. */
    static readonly defaultPostProcesses: readonly PostProcess[] = postProcesses

    /** The options that defines how `this.convert` converts HTML to markdown. */
    options: HTMLarkdownOptions

    constructor(options?: PartialDeep<HTMLarkdownOptions>) {
        this.options = HTMLarkdown._getDefaultHTMLarkdownOptions()
        if (options?.preloadPlugins) this.loadPlugins(options.preloadPlugins)
        mergeOverwriteArray(this.options, options)
        this.loadPlugins(this.options.plugins)
    }

    /**
     * Finds an element's associated rule, based solely on the `options` param
     * provided.
     *
     * The rules to search from is found in `options.rules`.
     * @param element The element to find the rule for.
     * @param options The options to find the rules from.
     * @returns The rule associated with `element`, or `null` if no such rule is found.
     */
    static findRule(element: Element, options: HTMLarkdownOptions): Rule | null {
        const elementTagName = element.tagName.toLowerCase() as TagName

        const isFilterAnd = (x: IterableElement<FilterOr>): x is FilterAnd => typeof x === 'object'
        const isTagName = (x: IterableElement<FilterOr | FilterAnd>): x is TagName =>
            typeof x === 'string'

        const isMatchTagOrPredicate = (x: TagName | FilterPredicate) =>
            isTagName(x) ? elementTagName === x : x(element, options)
        const isMatchRule = (rule: Rule): boolean =>
            rule.filter.some((x) =>
                isFilterAnd(x) ? x.every(isMatchTagOrPredicate) : isMatchTagOrPredicate(x)
            )

        return options.rules.slice().reverse().find(isMatchRule) ?? null
    }

    /**
     * Load plugins, which mutates this `HTMLarkdown` instance.
     *
     * The plugins are loaded starting from the front of the `plugins` array,
     * to the back.
     * @param plugins The plugins to load.
     */
    loadPlugins(plugins: Plugin[]): void {
        plugins.forEach((plugin) => plugin(this))
    }

    /**
     * Adds a new pre-process to the conversion.
     *
     * By default, the added pre-process evaluated **AFTER** all the other pre-processes.
     * @param preProcess The pre-process to add
     * @param runFirst Whether to run the pre-process first or last among the pre-processes \
     * _(default: `false`)_
     */
    addPreProcess(preProcess: PreProcess, runFirst: boolean = false): void {
        if (runFirst) this.options.preProcesses.unshift(preProcess)
        else this.options.preProcesses.push(preProcess)
    }

    /**
     * Adds a new rule to the conversion.
     *
     * By default, the added rule is prioritised and evaluated **BEFORE** all the other rules.
     * @param rule The rule to add
     * @param runFirst Whether to run the rule first or last among the rules \
     * _(default: `true`)_
     */
    addRule(rule: Rule, runFirst: boolean = true): void {
        if (runFirst) this.options.rules.push(rule)
        else this.options.rules.unshift(rule)
    }

    /**
     * Adds a new text-process to the conversion.
     *
     * By default, the added text-process evaluated **AFTER** all the other text-processes.
     * @param textProcess The text-process to add
     * @param runFirst Whether to run the text-process first or last among the text-processes \
     * _(default: `false`)_
     */
    addTextProcess(textProcess: TextProcess, runFirst: boolean = false): void {
        if (runFirst) this.options.textProcesses.unshift(textProcess)
        else this.options.textProcesses.push(textProcess)
    }

    /**
     * Adds a new post-process to the conversion.
     *
     * By default, the added post-process evaluated **AFTER** all the other post-processes.
     * @param postProcess The post-process to add
     * @param runFirst Whether to run the post-process first or last among the post-processes \
     * _(default: `false`)_
     */
    addPostProcess(postProcess: PostProcess, runFirst: boolean = false): void {
        if (runFirst) this.options.postProcesses.unshift(postProcess)
        else this.options.postProcesses.push(postProcess)
    }

    /**
     * Converts the child-elements of a container-element into markdown.
     *
     * This **DOES NOT** mutate the container-element,  \
     * as it's **deep-cloned** before any processing/conversion.
     *
     * _**Note:** The container-element itself won't be converted,
     * nor is any text-nodes that are direct-child of the container.  \
     * Only it's child-elements are converted._
     * @example
     * const htmlarkdown = new HTMLarkdown()
     * const container = document.getElementById('container')
     * console.log(container.outerHTML)
     * // => '<div id="container"><h1>Heading</h1></div>'
     * htmlarkdown.convert(container)
     * // => '# Heading'
     * @param container The container-element containing the elements to be converted.
     * @returns Markdown conversion of the elements in `container`.
     */
    convert(container: Element): string

    /**
     * Parses a string containing HTML source-code into a DOM via `stringToDom`
     * utility function,  \
     * then converts that DOM into markdown.
     *
     * By default, the `htmlString` is expected to not be wrapped in a container
     * tag.  \
     * If the it is, then set `hasContainer` param to `true`.
     *
     * @example
     * const htmlarkdown = new HTMLarkdown()
     * const htmlString = `
     * <h1>Heading</h1>
     * <p>Paragraph</p>
     * `
     * const htmlStrWithContainer = `<div>${htmlString}</div>`
     * htmlarkdown.convert(htmlString)
     * htmlarkdown.convert(htmlStrWithContainer, true)
     * // Both output => '# Heading\n\nParagraph'
     * @param htmlString The string containing HTML source-code.
     * @param hasContainer Whether `htmlString` is wrapped in a container tag.  \
     * _(default: `false`)_
     * @returns Markdown conversion of `htmlString`.
     */
    convert(htmlString: string, hasContainer?: boolean): string

    convert(container: Element | string, hasContainer = false): string {
        let containerElement: Element
        if (typeof container === 'object') containerElement = container.cloneNode(true) as Element
        else
            containerElement = hasContainer
                ? stringToDom(container).firstElementChild!
                : stringToDom(container)
        containerElement = this._preProcess(containerElement)

        const childElements = Array.from(containerElement.children)
        const rawMarkdown = childElements
            .map((ele) =>
                this._convert(ele, HTMLarkdown._getDefaultParentOptions(containerElement))
            )
            .join('')
        return this._postProcess(rawMarkdown)
    }

    /** Gets the default `HTMLarkdownOptions`. */
    private static _getDefaultHTMLarkdownOptions(): HTMLarkdownOptions {
        return {
            preProcesses: HTMLarkdown.defaultPreProcesses.slice(),
            rules: HTMLarkdown.defaultRules.slice(),
            textProcesses: HTMLarkdown.defaultTextProcesses.slice(),
            postProcesses: HTMLarkdown.defaultPostProcesses.slice(),
            urlTransformer: null,
            elementsNoWhitespaceCollapse: ['pre'],
            reverseAutolinks: {
                textUrls: true,
                images: true,
            },
            plugins: [],
            preloadPlugins: [],
            addTrailingLinebreak: false,
            codeblockTrailingLinebreak: 'both',
            maxPrettyTableWidth: 80,
            htmlEscapingMode: 'conservative',
        }
    }

    /** Gets the default parent-options, which is of type `PassDownOptions`. */
    private static _getDefaultParentOptions(containerElement: Element): PassDownOptions {
        return {
            forceHtml: false,
            escapeNbsp: true,
            containerElement,
            isInsideBlockElement: false,
            isOrderedList: false,
            isInsideList: false,
            olStartingNum: -1,
            isLooseList: false,
            escapeHtml: false,
            escapeMarkdown: true,
            escapeBlankLines: false,
        }
    }

    /**
     * Runs all the pre-processes in `this.options.preProcesses` on `container`.
     * @param container The container-element to run the pre-processes on.
     * @returns The pre-processed container-element.
     */
    private _preProcess(container: Element): Element {
        return this.options.preProcesses.reduce(
            (container, process) => process(container, this.options),
            container
        )
    }

    /**
     * Runs all the text-processes in `this.options.textProcesses` on a
     * text-node's text.
     * @param text The text content of the text-node.
     * @param textNode The text-node.
     * @param parentOptions The options passed down from the text-node's parents's rule.
     * @returns The processed text.
     */
    private _processText(text: string, textNode: TextNode, parentOptions: PassDownOptions): string {
        return this.options.textProcesses.reduce(
            (text, process) => process(text, textNode, this.options, parentOptions),
            text
        )
    }

    /**
     * Runs all the post-processes in `this.options.postProcesses` on the
     * markdown string generated by the rules and text-processes.
     * @param rawMarkdown The markdown string generated by the rules and text-processes.
     * @returns The post-processed markdown string.
     */
    private _postProcess(rawMarkdown: string): string {
        return this.options.postProcesses.reduce(
            (rawMarkdown, process) => process(rawMarkdown, this.options),
            rawMarkdown
        )
    }

    /**
     * Recursively converts a node _(either a text-node or element)_ into
     * markdown.
     *
     * Elements are converted by rules, and text-nodes are converted by
     * text-processes.
     * @param node The node to convert.
     * @param parentOptions The options passed down from the node's parents's rule.
     * @returns The raw markdown generated by the rules and text-processes.
     */
    private _convert(node: Node, parentOptions: PassDownOptions): string {
        if (isTextNode(node)) return this._processText(node.nodeValue, node, parentOptions)
        if (!isElement(node)) return ''

        const rule = HTMLarkdown.findRule(node, this.options)
        if (!rule) return ''

        let replacementFunc
        if (isRuleWithHtml(rule) && rule.toUseHtmlPredicate(node, this.options, parentOptions))
            replacementFunc = rule.htmlReplacement
        else replacementFunc = rule.replacement

        let value
        let childOptions = parentOptions
        const replacement = replacementFunc(node, this.options, parentOptions)
        const isReplacementObj = (
            replacement: ReturnType<ReplacementFunction>
        ): replacement is ReplacementObj => typeof replacement === 'object'

        if (isReplacementObj(replacement)) {
            value = replacement.value
            childOptions = mergeOverwriteArray({}, parentOptions, replacement.childOptions)
        } else {
            value = replacement
        }

        if (typeof value === 'string') return value

        const innerContent = Array.from(node.childNodes)
            .map((node) => this._convert(node, childOptions))
            .join('')
        return value(innerContent)
    }
}
