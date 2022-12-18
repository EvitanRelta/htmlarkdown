import type { Plugin } from './Plugin'
import type { PostProcess, PreProcess, TextProcess } from './processes'
import type { Rule, TagName } from './Rule'
import type { UrlTransformer } from './UrlTransformer'

export interface HTMLarkdownOptions {
    /**
     * The pre-processes to use.
     *
     * Pre-processes modify the container element.  \
     * They are ran first, before the any other processes/rules.
     *
     * They are used to "clean-up" the elements before being converted to
     * markdown by the rules/text-processes.
     *
     * _**Note:** The container element can be safely mutated, as
     * `HTMLarkdown.convert` deep-clones the container element given to it._
     * @default HTMLarkdown.defaultPreProcesses
     */
    preProcesses: PreProcess[]
    /**
     * The rules to use.
     *
     * Rules dictate how each element is converted to markdown.  \
     * They are ran after pre-processes, and together with text-processes.
     *
     * They can have `toUseHtmlPredicate` and `htmlReplacement` properties  \
     * which control when/how elements are converted to HTML-in-markdown syntax.
     * @default HTMLarkdown.defaultRules
     */
    rules: Rule[]
    /**
     * The text-processes to use.
     *
     * Text-processes transforms the text in each text-node.  \
     * They are ran after pre-processes, and together with rules.
     *
     * They are mainly used to escape text characters, such as markdown-specific
     * ones like `**` *(ie. bold)* & `#` *(ie. heading)*.
     * @default HTMLarkdown.defaultTextProcesses
     */
    textProcesses: TextProcess[]
    /**
     * The post-processes to use.
     *
     * Post-processes transforms the markdown output string produced by the
     * rules/text-processes.  \
     * They are ran last, after all other processes/rules.
     *
     * They are used to "clean-up" the final markdown string, such as for trimming
     * excess newlines from the markdown.
     * @default HTMLarkdown.defaultPostProcesses
     */
    postProcesses: PostProcess[]
    /**
     * Function to transform the URLs of hyperlinks & images.
     *
     * Useful for converting between relative URLs and absolute URLs.
     * @default null
     */
    urlTransformer: null | UrlTransformer
    /**
     * The elements to avoid collapsing whitespaces in.
     *
     * Set this to `"all"` to completely preserve whitespaces, or `[]` to
     * completely collapse whitespaces.
     * @default ["pre"]
     */
    elementsNoWhitespaceCollapse: 'all' | TagName[]
    /**
     * The types of autolinks to reverse.  \
     * Reversing autolinks removes the `<a>` tag generated by autolinking.
     *
     * @default { textUrls: true, images: true }
     */
    reverseAutolinks: {
        /**
         * Autolinks that converts URLs in texts to hyperlinks.
         *
         * eg. Markdown `"www.google.com"` is rendered as
         * ```html
         * <a href="http://www.google.com">www.google.com</a>
         * ```
         * @default true
         */
        textUrls: boolean
        /**
         * Autolinks that wraps images in an `<a>` tag with a `href` to the
         * image `src`.
         *
         * eg. Markdown `"![](https://image.src)"` is rendered as
         * ```html
         * <a href="https://image.src">
         *   <img src="https://image.src" />
         * </a>
         * ```
         * @default true
         */
        images: boolean
    }
    /**
     * Array of plugins that configures the `HTMLarkdown` instance.
     *
     * Plugins are loaded after the `HTMLarkdownOptions` are set.  \
     * Meaning, plugins may overwrite the given `HTMLarkdownOptions`.
     *
     * _(use `preloadPlugins` option instead if you don't want plugins overwriting your configs)_
     * @default []
     */
    plugins: Plugin[]
    /**
     * Similar to `plugins` option, but loads the plugins first _(with the `HTMLarkdown`
     * instance having default `HTMLarkdownOptions` values)_, before setting
     * the `HTMLarkdownOptions`.
     * @default []
     */
    preloadPlugins: Plugin[]
    /**
     * Whether to inserts a linebreak inside block-elements that are either
     * empty or end with a linebreak.
     *
     * For example, if this is set to `false`, the HTML-rendering of empty
     * paragraphs/headings might have `0` height _(as it's empty)_;  \
     * and paragraphs/headings ending with a linebreak might not render the last
     * linebreak.
     * @default false
     */
    addTrailingLinebreak: boolean
    /**
     * A trailing-newline is often added by markdown-to-HTML renderers *(like
     * GitHub)* as shown below:
     * ````html
     * ```
     * TEXT  (renders as)  <pre><code>TEXT
     * ```                 </code></pre>
     * ````
     *
     * - `remove` – removes it from the input HTML
     * - `add` – adds it to output markdown (in the case where the codeblock is
     * converted to HTML-syntax)
     * - `both` – adds and removes
     * - `none` – uses the inner-text of the `<pre><code>` element as-is
     *
     * ---
     *
     * Given this input HTML:
     * ```html
     * <pre><code>TEXT
     * </code></pre>
     * ```
     * \
     * The output will be:
     * ````md
     * with "remove":   w/o "remove":
     * ```              ```
     * TEXT             TEXT
     * ```
     *                  ```
     * ````
     *
     * ---
     *
     * Given this input HTML
     * ```html
     * <pre forcehtml><code>TEXT</code></pre>
     * ```
     * \
     * The output will be:
     * ```html
     * with "add":
     * <pre><code>TEXT
     * </code></pre>
     * ```
     * ```html
     * w/o "add":
     * <pre><code>TEXT</code></pre>
     * ```
     * @default 'both'
     */
    codeblockTrailingLinebreak: 'remove' | 'add' | 'both' | 'none'
    /**
     * The max width of a table before the converter stops trying to make the
     * columns align \
     * *(ie. stop trying to make it pretty)*.
     * ```
     * <===== Width =====>
     * | HEADER | HEADER |
     * |--------|--------|
     * |  CELL  |  CELL  |
     * ```
     * \
     * If a table is beyond this width, it would look something like this:
     * ```
     * | HEADER | HEADER |
     * |---|---|
     * | CELL | CELL |
     * ```
     * @default 80
     */
    maxPrettyTableWidth: 80
}
