<div class="tooltip-container">
    <p>
        The mode to use when escaping HTML-entities.
        <i>(escaping to <code>&amp;amp;</code>, <code>&amp;lt;</code>, etc)</i>
    </p>
    <ul>
        <li>
            <code>conservative</code> - only escapes when the character will cause problems when
            rendered to HTML.
            <br />Thus, allowing text like <code>"A & B"</code> and <code>"&lt;1>"</code> to go unescaped.
        </li>
        <li>
            <code>&&lt;></code> - escapes those 3 characters only.
        </li>
        <li><code>&&lt;>"'</code> - escapes all 5 HTML-entities.</li>
    </ul>
    <p><i>@default</i><br /><code>"conservative"</code></p>
</div>
