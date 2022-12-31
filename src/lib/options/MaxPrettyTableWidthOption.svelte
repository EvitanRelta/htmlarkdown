<script lang="ts">
    import { HTMLarkdown, type HTMLarkdownOptions } from 'htmlarkdown'
    import Popover from 'svelte-easy-popover'
    import { MaxPrettyTableWidthToolTip } from './tooltips'

    export let options: HTMLarkdownOptions
    export let rerender: () => void

    const defaultMaxPrettyTableWidth = new HTMLarkdown().options.maxPrettyTableWidth
    let hasErrorMaxPrettyTableWidth = false
    let ref: Element
</script>

<span bind:this={ref}>maxPrettyTableWidth:</span>
<input
    type="text"
    class={hasErrorMaxPrettyTableWidth ? 'error' : ''}
    value={defaultMaxPrettyTableWidth}
    on:input={(e) => {
        const newValue = Number(e.currentTarget.value)
        if (e.currentTarget.value === '' || isNaN(newValue)) {
            hasErrorMaxPrettyTableWidth = true
        } else {
            hasErrorMaxPrettyTableWidth = false
            options.maxPrettyTableWidth = newValue
            rerender()
        }
    }}
/>
<Popover triggerEvents={['hover']} referenceElement={ref}>
    <MaxPrettyTableWidthToolTip />
</Popover>
