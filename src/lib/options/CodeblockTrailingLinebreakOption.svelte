<script lang="ts">
    import type { HTMLarkdownOptions } from 'htmlarkdown'
    import Popover from 'svelte-easy-popover'
    import { CodeblockTrailingLinebreakToolTip } from './tooltips'

    export let options: HTMLarkdownOptions
    export let rerender: () => void

    let ref: Element
</script>

<span bind:this={ref}>codeblockTrailingLinebreak:</span>
<select
    on:input={(e) => {
        // @ts-expect-error
        options.codeblockTrailingLinebreak = e.currentTarget.value
        rerender()
    }}
>
    <option value="both">both</option>
    <option value="remove">remove</option>
    <option value="add">add</option>
    <option value="none">none</option>
</select>
<Popover triggerEvents={['hover']} referenceElement={ref}>
    <CodeblockTrailingLinebreakToolTip />
</Popover>
