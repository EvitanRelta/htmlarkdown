import _ from 'lodash'
import type { Plugin, UrlTransformer } from '../../src'
import { HTMLarkdown } from '../../src'

const identityFn: UrlTransformer = (x) => x
const dummyUrl: UrlTransformer = () => 'dummy-url'
const setIdentityUrlTransformer: Plugin = (htmlarkdown) => {
    htmlarkdown.options.urlTransformer = identityFn
}

describe('Plugin', () => {
    test.concurrent('plugin', async () => {
        const htmlarkdown = new HTMLarkdown({
            plugins: [setIdentityUrlTransformer],
        })
        expect(htmlarkdown.options.urlTransformer).toBe(identityFn)
    })

    test.concurrent('plugin overwrite', async () => {
        const htmlarkdown = new HTMLarkdown({
            plugins: [setIdentityUrlTransformer],
            urlTransformer: dummyUrl,
        })
        expect(htmlarkdown.options.urlTransformer).toBe(identityFn)
    })

    test.concurrent('preload-plugin', async () => {
        const htmlarkdown = new HTMLarkdown({
            preloadPlugins: [setIdentityUrlTransformer],
        })
        expect(htmlarkdown.options.urlTransformer).toBe(identityFn)
    })

    test.concurrent('preload-plugin overwrite', async () => {
        const htmlarkdown = new HTMLarkdown({
            preloadPlugins: [setIdentityUrlTransformer],
            urlTransformer: dummyUrl,
        })
        expect(htmlarkdown.options.urlTransformer).toBe(dummyUrl)
    })

    test.concurrent('copy instance', async () => {
        const idHtmlarkdown = new HTMLarkdown({ urlTransformer: identityFn })
        const pluginHtmlarkdown = new HTMLarkdown({
            plugins: [setIdentityUrlTransformer],
        })
        const copy = new HTMLarkdown(pluginHtmlarkdown.options)
        expect(_.isEqual(pluginHtmlarkdown.options, idHtmlarkdown.options)).toBe(true)
        expect(_.isEqual(pluginHtmlarkdown.options, copy.options)).toBe(true)
    })
})
