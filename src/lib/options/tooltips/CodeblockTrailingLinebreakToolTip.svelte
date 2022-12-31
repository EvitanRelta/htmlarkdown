<div class="tooltip-container">
    <p>
        A trailing-newline is often added by markdown-to-HTML renderers <i>(like GitHub)</i> as shown
        below:
    </p>
    <pre><code
            >```                 &lt;pre>&lt;code>TEXT
TEXT  (renders as)  &lt;/code>&lt;/pre>
```                 
</code></pre>
    <ul>
        <li><code>remove</code> - removes it from the input HTML</li>
        <li>
            <code>add</code> - adds it to output markdown.
            <i>(in the case where the codeblock is converted to HTML-syntax)</i>
        </li>
        <li><code>both</code> - adds and removes.</li>
        <li>
            <code>none</code> - uses the inner-text of the
            <code>&lt;pre>&lt;code></code> element as-is.
        </li>
    </ul>
</div>
