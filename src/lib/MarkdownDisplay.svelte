<script lang="ts">
    import { markdown } from '@codemirror/lang-markdown'
    import { syntaxHighlighting } from '@codemirror/language'
    import { EditorState } from '@codemirror/state'
    import { oneDark, oneDarkHighlightStyle } from '@codemirror/theme-one-dark'
    import { EditorView } from '@codemirror/view'
    import { onMount } from 'svelte'

    let container: Element
    let view: EditorView

    export let markdownOutput: string
    $: if (view) {
        view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: markdownOutput } })
        console.log('updated')
    }

    onMount(() => {
        view = new EditorView({
            extensions: [
                markdown(),
                syntaxHighlighting(oneDarkHighlightStyle),
                EditorView.theme({
                    '&': { height: '100%' },
                    '.cm-content': { height: '100%' },
                }),
                oneDark,
                EditorState.readOnly.of(true),
            ],
            parent: container,
        })
    })
</script>

<div bind:this={container} id="editor" />

<style>
    #editor {
        text-align: left;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }
</style>
