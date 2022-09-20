import type {
    Filter,
    HTMLarkdownOptions,
    PassDownOptions,
    Preprocess,
    Rule,
    TagName,
    TextNode,
    TextProcess,
} from '../types'
import { isElement, isTextNode, stringToDom } from '../utilities'
import { isRuleWithHtml } from './helpers'
import { preprocesses } from './preprocesses'
import { rules } from './rules'
import { textProcesses } from './textProcesses'

export class HTMLarkdown {
    readonly defaultRules: readonly Rule[] = rules
    readonly defaultPreprocesses: readonly Preprocess[] = preprocesses
    readonly defaultTextProcesses: readonly TextProcess[] = textProcesses

    options: HTMLarkdownOptions
    rules: Rule[] = this.defaultRules.slice()
    preprocesses: Preprocess[] = this.defaultPreprocesses.slice()
    textProcesses: TextProcess[] = this.defaultTextProcesses.slice()

    constructor(options?: HTMLarkdownOptions) {
        this.options = options ?? {}
    }

    addRule(rule: Rule): void {
        this.rules.push(rule)
    }

    addPreprocess(preprocess: Preprocess): void {
        this.preprocesses.push(preprocess)
    }

    preprocess(container: Element): Element {
        return this.preprocesses.reduce(
            (container, process) => process(container, this.options),
            container
        )
    }

    processText(text: string, textNode: TextNode, parentOptions: PassDownOptions): string {
        return this.textProcesses.reduce(
            (text, process) => process(text, textNode, this.options, parentOptions),
            text
        )
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
        return childElements
            .map((ele) => this._convert(ele, this._getDefaultParentOptions()))
            .join('')
            .replaceAll(/^[ \n]*\n|\n[ \n]*$/g, '')
    }

    private _getDefaultParentOptions(): PassDownOptions {
        return { forceHtml: false }
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
