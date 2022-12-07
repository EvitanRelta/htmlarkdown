import _ from 'lodash'
import type { PartialDeep } from 'type-fest'
import type {
    Filter,
    HTMLarkdownOptions,
    PassDownOptions,
    Plugin,
    Postprocess,
    Preprocess,
    Rule,
    TagName,
    TextNode,
    TextProcess,
} from '../types'
import { isElement, isTextNode, stringToDom } from '../utilities'
import { isRuleWithHtml } from './helpers'
import { postprocesses } from './postprocesses'
import { preprocesses } from './preprocesses'
import { rules } from './rules'
import { textProcesses } from './textProcesses'

export class HTMLarkdown {
    readonly defaultRules: readonly Rule[] = rules
    readonly defaultPreprocesses: readonly Preprocess[] = preprocesses
    readonly defaultTextProcesses: readonly TextProcess[] = textProcesses
    readonly defaultPostprocesses: readonly Postprocess[] = postprocesses

    options: HTMLarkdownOptions
    rules: Rule[] = this.defaultRules.slice()
    preprocesses: Preprocess[] = this.defaultPreprocesses.slice()
    textProcesses: TextProcess[] = this.defaultTextProcesses.slice()
    postprocesses: Postprocess[] = this.defaultPostprocesses.slice()

    constructor(options?: PartialDeep<HTMLarkdownOptions>) {
        this.options = this._getDefaultHTMLarkdownOptions()
        if (options?.preloadPlugins) this.loadPlugins(options.preloadPlugins)
        this.options = _.merge(this.options, options)
        this.loadPlugins(this.options.plugins)
    }

    loadPlugins(plugins: Plugin[]): void {
        plugins.forEach((plugin) => plugin(this))
    }

    /**
     * Adds a new preprocess to the conversion.
     *
     * By default, the added preprocess evaluated **AFTER** all the other preprocesses.
     * @param preprocess The preprocess to add
     * @param runFirst Whether to run the preprocess first or last among the preprocesses \
     * _(default: `false`)_
     */
    addPreprocess(preprocess: Preprocess, runFirst: boolean = false): void {
        if (runFirst) this.preprocesses.unshift(preprocess)
        else this.preprocesses.push(preprocess)
    }

    preprocess(container: Element): Element {
        return this.preprocesses.reduce(
            (container, process) => process(container, this.options),
            container
        )
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
        if (runFirst) this.textProcesses.unshift(textProcess)
        else this.textProcesses.push(textProcess)
    }

    processText(text: string, textNode: TextNode, parentOptions: PassDownOptions): string {
        return this.textProcesses.reduce(
            (text, process) => process(text, textNode, this.options, parentOptions),
            text
        )
    }

    /**
     * Adds a new postprocess to the conversion.
     *
     * By default, the added postprocess evaluated **AFTER** all the other postprocesses.
     * @param postprocess The postprocess to add
     * @param runFirst Whether to run the postprocess first or last among the postprocesses \
     * _(default: `false`)_
     */
    addPostprocess(postprocess: Postprocess, runFirst: boolean = false): void {
        if (runFirst) this.postprocesses.unshift(postprocess)
        else this.postprocesses.push(postprocess)
    }

    postprocess(rawMarkdown: string): string {
        return this.postprocesses.reduce(
            (rawMarkdown, process) => process(rawMarkdown, this.options),
            rawMarkdown
        )
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
        if (runFirst) this.rules.push(rule)
        else this.rules.unshift(rule)
    }

    findRule(element: Element): Rule | null {
        const isTagNameArr = (filter: TagName[] | Filter[]): filter is TagName[] =>
            filter.every((x) => typeof x === 'string')
        const isMatch = (element: Element, filter: Filter | Filter[]): boolean => {
            if (typeof filter === 'string')
                return element.tagName.toLowerCase() === filter.toLowerCase()
            if (typeof filter === 'function') return filter(element, this.options)
            if (isTagNameArr(filter))
                return filter
                    .map((x) => x.toLowerCase())
                    .includes(element.tagName.toLowerCase() as TagName)
            return filter.every((x) => isMatch(element, x))
        }

        return (
            this.rules
                .slice()
                .reverse()
                .find((rule) => isMatch(element, rule.filter)) ?? null
        )
    }

    // Assumes no text nodes in childNodes
    convert(container: Element | string): string {
        let containerElement: Element
        if (typeof container === 'string') containerElement = stringToDom(container)
        else containerElement = container.cloneNode(true) as Element
        containerElement = this.preprocess(containerElement)

        const childElements = Array.from(containerElement.children)
        const rawMarkdown = childElements
            .map((ele) => this._convert(ele, this._getDefaultParentOptions()))
            .join('')
        return this.postprocess(rawMarkdown)
    }

    private _getDefaultHTMLarkdownOptions(): HTMLarkdownOptions {
        return {
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
        }
    }

    private _getDefaultParentOptions(): PassDownOptions {
        return {
            forceHtml: false,
            escapeWhitespace: true,
        }
    }

    private _convert(node: Node, parentOptions: PassDownOptions): string {
        if (isTextNode(node)) return this.processText(node.nodeValue, node, parentOptions)
        if (!isElement(node)) return ''

        const rule = this.findRule(node)
        if (!rule) return ''

        let replacementFunc
        if (isRuleWithHtml(rule) && rule.toUseHtmlPredicate(node, this.options, parentOptions))
            replacementFunc = rule.htmlReplacement
        else replacementFunc = rule.replacement

        let value
        let childOptions = parentOptions
        const replacement = replacementFunc(node, this.options, parentOptions)

        if (typeof replacement === 'object') {
            value = replacement.value
            childOptions = {
                ...parentOptions,
                ...replacement.childOptions,
            }
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
