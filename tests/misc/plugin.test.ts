import type { Plugin, UrlTransformer } from '../../src'
import { HTMLarkdown } from '../../src'

const identityFn: UrlTransformer = (x) => x
const dummyUrl: UrlTransformer = () => 'dummy-url'
const setIdentityUrlTransformer: Plugin = (htmlarkdown) => {
    htmlarkdown.options.urlTransformer = identityFn
}

test.concurrent('Plugin - plugin', async () => {
    const htmlarkdown = new HTMLarkdown({
        plugins: [setIdentityUrlTransformer],
    })
    expect(htmlarkdown.options.urlTransformer).toBe(identityFn)
})

test.concurrent('Plugin - plugin overwrite', async () => {
    const htmlarkdown = new HTMLarkdown({
        plugins: [setIdentityUrlTransformer],
        urlTransformer: dummyUrl,
    })
    expect(htmlarkdown.options.urlTransformer).toBe(identityFn)
})

test.concurrent('Plugin - preload-plugin', async () => {
    const htmlarkdown = new HTMLarkdown({
        preloadPlugins: [setIdentityUrlTransformer],
    })
    expect(htmlarkdown.options.urlTransformer).toBe(identityFn)
})

test.concurrent('Plugin - preload-plugin overwrite', async () => {
    const htmlarkdown = new HTMLarkdown({
        preloadPlugins: [setIdentityUrlTransformer],
        urlTransformer: dummyUrl,
    })
    expect(htmlarkdown.options.urlTransformer).toBe(dummyUrl)
})
