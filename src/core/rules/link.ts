import type { RuleWithHTML } from '../../types'
import { isTextNode, obeyForceHtml } from '../../utilities'

const urlWOProtocol = (url: string) => url.replace(/^https?:\/\//, '')
const isTextAutolink = (linkElement: Element) => {
    const href = linkElement.getAttribute('href')
    if (!href) return false

    const hrefWOProtocol = urlWOProtocol(href)
    const hasTextNodeWithHref = (node: Node) =>
        isTextNode(node)
            ? node.nodeValue === href || node.nodeValue === hrefWOProtocol
            : node.nodeName === 'CODE' // If URL is in code element, it won't be autolinked in Github
            ? false
            : Array.from(node.childNodes).some(hasTextNodeWithHref)

    return hasTextNodeWithHref(linkElement)
}
const isImageAutolink = (linkElement: Element) => {
    if (linkElement.childNodes.length !== 1) return false
    const href = linkElement.getAttribute('href')
    const child = linkElement.firstChild!
    if (!href || child.nodeName !== 'IMG') return false
    return (child as Element).getAttribute('src') === href
}

export const link: RuleWithHTML = {
    filter: ['a'],
    toUseHtmlPredicate: obeyForceHtml,
    replacement: (element, options, parentOptions) => (innerContent) => {
        if (options.reverseAutolinks.textUrls && isTextAutolink(element)) return innerContent
        if (options.reverseAutolinks.images && isImageAutolink(element)) return innerContent

        let url = element.getAttribute('href') || ''
        if (options.urlTransformer !== null)
            url = options.urlTransformer(url, element, options, parentOptions)
        return innerContent ? `[${innerContent}](${url})` : ''
    },
    htmlReplacement: (element, options, parentOptions) => (innerContent) => {
        if (options.reverseAutolinks.textUrls && isTextAutolink(element)) return innerContent
        if (options.reverseAutolinks.images && isImageAutolink(element)) return innerContent

        let url = element.getAttribute('href') || ''
        if (options.urlTransformer !== null)
            url = options.urlTransformer(url, element, options, parentOptions)
        return `<a href="${url}">${innerContent}</a>`
    },
}
