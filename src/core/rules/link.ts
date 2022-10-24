import { any } from 'predicate-hof'
import type { Rule } from '../../types'
import { obeyForceHtml } from '../../utilities'

const urlWOProtocol = (url: string) => url.replace(/^https?:\/\//, '')
const isImageAutolink = (linkElement: Element) => {
    if (linkElement.childNodes.length !== 1) return false
    const href = linkElement.getAttribute('href')
    const child = linkElement.firstChild!
    if (!href || child.nodeName !== 'IMG') return false
    return (child as Element).getAttribute('src') === href
}
const isTextAutolink = (linkElement: Element) => {
    const href = linkElement.getAttribute('href')
    if (!href) return false
    return linkElement.textContent === href || linkElement.textContent === urlWOProtocol(href)
}
const isAutolink = any(isImageAutolink, isTextAutolink)

export const link: Rule = {
    filter: 'a',
    toUseHtmlPredicate: obeyForceHtml,
    replacement: (element, options, parentOptions) => (innerContent) => {
        if (isAutolink(element)) return innerContent

        let url = element.getAttribute('href') || ''
        if (options.urlTransformer !== null)
            url = options.urlTransformer(url, element, options, parentOptions)
        return `[${innerContent}](${url})`
    },
    htmlReplacement: (element, options, parentOptions) => (innerContent) => {
        if (isAutolink(element)) return innerContent

        let url = element.getAttribute('href') || ''
        if (options.urlTransformer !== null)
            url = options.urlTransformer(url, element, options, parentOptions)
        return `<a href="${url}">${innerContent}</a>`
    },
}
