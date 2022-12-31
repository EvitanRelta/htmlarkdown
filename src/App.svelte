<script lang="ts">
    import { EditorView } from '@codemirror/view'
    import { HTMLarkdown } from 'htmlarkdown'
    import _ from 'lodash'
    import Editor from './lib/Editor.svelte'
    import MarkdownDisplay from './lib/MarkdownDisplay.svelte'
    import Options from './lib/Options.svelte'

    let markdownOutput = ''
    const htmlarkdown = new HTMLarkdown()
    // @ts-expect-error
    $: window.htmlarkdown = htmlarkdown

    let editorView: EditorView
    const rerender = _.debounce(() => {
        markdownOutput = htmlarkdown.convert(editorView.state.doc.toString())
    }, 50)
    const updateMarkdownDisplay = EditorView.updateListener.of((v) => {
        if (v.docChanged) rerender()
    })
</script>

<div class="content">
    <div class="row">
        <div class="column">
            <div class="card">
                <Editor bind:editorView {updateMarkdownDisplay} />
            </div>
        </div>
        <div class="column">
            <div class="card">
                <MarkdownDisplay {markdownOutput} />
            </div>
        </div>
    </div>
    <div class="row">
        <Options {rerender} options={htmlarkdown.options} />
    </div>
</div>

<style>
    .content * {
        box-sizing: border-box;
    }
    /* Float four columns side by side */
    .column {
        float: left;
        width: 50%;
        padding: 0 10px;
    }

    /* Remove extra left and right margins, due to padding */
    .row {
        margin: 0 -5px;
    }

    /* Clear floats after the columns */
    .row:after {
        content: '';
        display: table;
        clear: both;
    }

    /* Style the counter cards */
    .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */
        /* padding: 16px; */
        text-align: center;
        background-color: rgb(57, 57, 57);
        height: 65vh;
    }

    /* Responsive columns - one column layout (vertical) on small screens */
    @media screen and (max-width: 600px) {
        .column {
            width: 100%;
            display: block;
            margin-bottom: 20px;
        }

        .card {
            height: 40vh;
        }
    }
</style>
