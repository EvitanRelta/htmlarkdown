<script lang="ts">
    import type { HTMLarkdownOptions } from 'htmlarkdown'
    import Popover from 'svelte-easy-popover'
    import { HtmlEscapingModeToolTip } from './tooltips'

    export let options: HTMLarkdownOptions
    export let rerender: () => void

    let ref: Element
</script>

<span bind:this={ref}>htmlEscapingMode:</span>
<select
    on:input={(e) => {
        // @ts-expect-error
        options.htmlEscapingMode = e.currentTarget.value
        rerender()
    }}
>
    <option value="conservative">conservative</option>
    <option value="&<>">&amp;&lt;&gt;</option>
    <option value="&<>&quot;'">&amp;&lt;&gt;"'</option>
</select>
<Popover triggerEvents={['hover']} referenceElement={ref}>
    <HtmlEscapingModeToolTip />
</Popover>
