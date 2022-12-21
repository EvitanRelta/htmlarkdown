# What are "loose" / "tight" lists?

Defined by [GitHub Flavored Markdown Spec - List section][lists]:

> A list is [loose][loose] if any of its constituent list items are separated by blank lines, or if any of its constituent list items directly contain two block-level elements with a blank line between them. Otherwise a list is [tight][tight]. _(The difference in HTML output is that paragraphs in a loose list are wrapped in `<p>` tags, while paragraphs in a tight list are not.)_

[lists]: https://github.github.com/gfm/#lists
[loose]: https://github.github.com/gfm/#loose
[tight]: https://github.github.com/gfm/#tight

<br>

Visually, loose list has larger spacings inbetween list-items, like so:

### Loose list

- loose

- loose

- loose

### Tight list

- tight
- tight
- tight

<br>

# Loose list examples

## Basic
```md
- Item 1

- Item 2

- Item 3
```

Which renders to:

```html
<!-- All have paragraphs -->
<ul>
  <li><p>Item 1</p></li>
  <li><p>Item 2</p></li>
  <li><p>Item 3</p></li>
</ul>
```

<br>

## With empty list-item

```md
- Item 1

- 

- Item 3
```

Which renders to:

```html
<!-- Empty list-items have no paragraphs -->
<ul>
  <li><p>Item 1</p></li>
  <li></li>
  <li><p>Item 3</p></li>
</ul>
```

<br>

## With block-element

```md
- Item 1

- # Item 2 (heading)

- Item 3
```

Which renders to:

```html
<!-- List-items with other block-elements isn't wrapped in paragraphs -->
<ul>
  <li><p>Item 1</p></li>
  <li><h1>Item 2 (heading)</h1></li>
  <li><p>Item 3</p></li>
</ul>
```

<br>

## With multiple block-elements in a list-item

````md
- Item 1

- Item 2
  
  ```
  Codeblock in list-item
  ```
  
  # Heading in list-item

- Item 3
````

Which renders to:

```html
<!-- List-items with multiple block-elements -->
<ul>
  <li><p>Item 1</p></li>
  <li>
    <p>Item 2</p>
<pre><code>Codeblock in list-item
</code></pre>
    <h1>Heading in list-item</h1>
  </li>
  <li><p>Item 3</p></li>
</ul>
```

<br>

# Tight list examples

## Basic
```md
- Item 1
- Item 2
- Item 3
```

Which renders to:

```html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

<br>

## With empty list-item

```md
- Item 1
- 
- Item 3
```

Which renders to:

```html
<ul>
  <li>Item 1</li>
  <li></li>
  <li>Item 3</li>
</ul>
```

<br>

## With block-element

```md
- Item 1
- # Item 2 (heading)
- Item 3
```

Which renders to:

```html
<ul>
  <li>Item 1</li>
  <li><h1>Item 2 (heading)</h1></li>
  <li>Item 3</li>
</ul>
```

<br>

## With multiple block-elements in a list-item

````md
- Item 1
- Item 2
  ```
  Codeblock in list-item
  ```
  # Heading in list-item
- Item 3
````

> _**Note:** You cannot have blank-lines inbetween block-elements inside list-item_

Which renders to:

```html
<ul>
  <li>Item 1</li>
  <li>
    Item 2
<pre><code>Codeblock in list-item
</code></pre>
    <h1>Heading in list-item</h1>
  </li>
  <li>Item 3</li>
</ul>
```
