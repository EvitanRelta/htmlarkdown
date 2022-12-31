<script lang="ts">
    import type { ViewUpdate } from '@codemirror/view'
    import { EditorView } from '@codemirror/view'
    import { HTMLarkdown } from 'htmlarkdown'
    import _ from 'lodash'
    import Editor from './lib/Editor.svelte'
    import MarkdownDisplay from './lib/MarkdownDisplay.svelte'

    let markdownOutput = ''
    const htmlarkdown = new HTMLarkdown()

    const updateMarkdownDisplay = EditorView.updateListener.of(
        _.debounce((v: ViewUpdate) => {
            if (v.docChanged) markdownOutput = htmlarkdown.convert(v.state.doc.toString())
        }, 50)
    )
</script>

<div class="content">
    <div class="column">
        <div class="card">
            <Editor {updateMarkdownDisplay} />
        </div>
    </div>
    <div class="column">
        <div class="card">
            <MarkdownDisplay {markdownOutput} />
        </div>
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
