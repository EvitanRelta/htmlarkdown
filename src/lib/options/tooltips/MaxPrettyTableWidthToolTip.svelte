<div class="tooltip-container">
    <p>
        The max width of a table before the converter stops trying to make the columns align<br />
        <i>(ie. stop trying to make it pretty)</i>.
    </p>
    <p>
        <i>
            <b>Note:</b> Set this to <code>-1</code> or something big like <code>999999</code> to never/always
            prettify tables respectively.
        </i>
    </p>
    <pre><code
            >&lt;===== Width =====>
| HEADER | HEADER |
|--------|--------|
|  CELL  |  CELL  |
</code></pre>
    <p>If a table is beyond this width, it would look something like this:</p>
    <pre><code
            >| HEADER | HEADER |
|---|---|
| CELL | CELL |
</code></pre>
    <p><i>@default</i><br /><code>80</code></p>
</div>
