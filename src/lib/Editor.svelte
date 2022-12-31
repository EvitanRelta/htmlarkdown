<script lang="ts">
    import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
    import { html } from '@codemirror/lang-html'
    import { syntaxHighlighting } from '@codemirror/language'
    import type { Extension } from '@codemirror/state'
    import { oneDark, oneDarkHighlightStyle } from '@codemirror/theme-one-dark'
    import { EditorView, keymap } from '@codemirror/view'
    import { onMount } from 'svelte'
    import initialEditorContents from '../initialEditorContents.html?raw'

    export let updateMarkdownDisplay: Extension
    let container: Element
    export let editorView: EditorView

    onMount(() => {
        editorView = new EditorView({
            extensions: [
                history(),
                keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
                html(),
                syntaxHighlighting(oneDarkHighlightStyle),
                EditorView.theme({
                    '&': { height: '100%' },
                    '.cm-content': { height: '100%' },
                }),
                oneDark,
                updateMarkdownDisplay,
            ],
            parent: container,
        })
        editorView.dispatch({
            changes: { from: 0, to: editorView.state.doc.length, insert: initialEditorContents },
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
