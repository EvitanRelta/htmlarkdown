<script lang="ts">
    import type { HTMLarkdownOptions } from 'htmlarkdown'
    import Popover from 'svelte-easy-popover'
    import { AddTrailingLinebreakToolTip } from './tooltips'

    export let options: HTMLarkdownOptions
    export let rerender: () => void

    let ref: Element
</script>

<span bind:this={ref}>addTrailingLinebreak:</span>
<input
    type="checkbox"
    checked={options.addTrailingLinebreak}
    on:input={(e) => {
        options.addTrailingLinebreak = e.currentTarget.checked
        rerender()
    }}
/>
<Popover triggerEvents={['hover']} referenceElement={ref}>
    <AddTrailingLinebreakToolTip />
</Popover>
