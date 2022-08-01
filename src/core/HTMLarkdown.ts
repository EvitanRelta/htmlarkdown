import type { Filter, HTMLarkdownOptions, Preprocess, Rule, TagName } from '../types'
import { isElement, isTextNode, stringToDom } from '../utilities'
import { isRuleWithHtml } from './helpers'
import { preprocesses } from './preprocesses'
import { rules } from './rules'

export class HTMLarkdown {
    readonly defaultRules: readonly Rule[] = rules
    readonly defaultPreprocesses: readonly Preprocess[] = preprocesses

    options: HTMLarkdownOptions
    rules: Rule[] = this.defaultRules.slice()
    preprocesses: Preprocess[] = this.defaultPreprocesses.slice()

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
            .map((ele) => this._convert(ele))
            .join('')
            .trim()
    }

    private _convert(node: Node): string {
        if (isTextNode(node)) return node.nodeValue ?? ''
        if (!isElement(node)) return ''

        const rule = this.findRule(node)
        if (!rule) return ''

        let replacementFunc
        if (isRuleWithHtml(rule) && rule.toUseHtmlPredicate(node, this.options))
            replacementFunc = rule.htmlReplacement
        else replacementFunc = rule.replacement

        const replacement = replacementFunc(node, this.options)
        if (typeof replacement === 'string') return replacement

        const innerContent = Array.from(node.childNodes)
            .map((node) => this._convert(node))
            .join('')
        return replacement(innerContent)
    }
}
