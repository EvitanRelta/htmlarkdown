import { HTMLarkdown, type Plugin, type UrlTransformer } from '../../src'

const identityFn: UrlTransformer = (x) => x
const dummyUrl: UrlTransformer = () => 'dummy-url'
const setIdentityUrlTransformer: Plugin = (htmlarkdown) => {
    htmlarkdown.options.urlTransformer = identityFn
}

test('Plugin - plugin', () => {
    const htmlarkdown = new HTMLarkdown({
        plugins: [setIdentityUrlTransformer],
    })
    expect(htmlarkdown.options.urlTransformer).toBe(identityFn)
})

test('Plugin - plugin overwrite', () => {
    const htmlarkdown = new HTMLarkdown({
        plugins: [setIdentityUrlTransformer],
        urlTransformer: dummyUrl,
    })
    expect(htmlarkdown.options.urlTransformer).toBe(identityFn)
})

test('Plugin - preload-plugin', () => {
    const htmlarkdown = new HTMLarkdown({
        preloadPlugins: [setIdentityUrlTransformer],
    })
    expect(htmlarkdown.options.urlTransformer).toBe(identityFn)
})

test('Plugin - preload-plugin overwrite', () => {
    const htmlarkdown = new HTMLarkdown({
        preloadPlugins: [setIdentityUrlTransformer],
        urlTransformer: dummyUrl,
    })
    expect(htmlarkdown.options.urlTransformer).toBe(dummyUrl)
})
