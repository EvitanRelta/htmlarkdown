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

export class HTMLarkdown {
    static readonly defaultRules: readonly Rule[] = rules
    static readonly defaultPreProcesses: readonly PreProcess[] = preProcesses
    static readonly defaultTextProcesses: readonly TextProcess[] = textProcesses
    static readonly defaultPostProcesses: readonly PostProcess[] = postProcesses

    options: HTMLarkdownOptions

    constructor(options?: PartialDeep<HTMLarkdownOptions>) {
        this.options = HTMLarkdown._getDefaultHTMLarkdownOptions()
        if (options?.preloadPlugins) this.loadPlugins(options.preloadPlugins)
        mergeOverwriteArray(this.options, options)
        this.loadPlugins(this.options.plugins)
    }

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

    // Assumes no text nodes in childNodes
    convert(container: Element | string): string {
        let containerElement: Element
        if (typeof container === 'string') containerElement = stringToDom(container)
        else containerElement = container.cloneNode(true) as Element
        containerElement = this._preProcess(containerElement)

        const childElements = Array.from(containerElement.children)
        const rawMarkdown = childElements
            .map((ele) =>
                this._convert(ele, HTMLarkdown._getDefaultParentOptions(containerElement))
            )
            .join('')
        return this._postProcess(rawMarkdown)
    }

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

    private static _getDefaultParentOptions(containerElement: Element): PassDownOptions {
        return {
            forceHtml: false,
            escapeWhitespace: true,
            containerElement,
            isInsideBlockElement: false,
            isOrderedList: false,
            isInsideList: false,
            olStartingNum: -1,
            isLooseList: false,
            escapeHtml: false,
            escapeMarkdown: true,
        }
    }

    private _preProcess(container: Element): Element {
        return this.options.preProcesses.reduce(
            (container, process) => process(container, this.options),
            container
        )
    }

    private _processText(text: string, textNode: TextNode, parentOptions: PassDownOptions): string {
        return this.options.textProcesses.reduce(
            (text, process) => process(text, textNode, this.options, parentOptions),
            text
        )
    }

    private _postProcess(rawMarkdown: string): string {
        return this.options.postProcesses.reduce(
            (rawMarkdown, process) => process(rawMarkdown, this.options),
            rawMarkdown
        )
    }

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
