<script lang="ts">
    import { HTMLarkdown, type HTMLarkdownOptions } from 'htmlarkdown'
    import Popover from 'svelte-easy-popover'
    import { ElementsNoWhitespaceCollapseToolTip } from './tooltips'

    export let options: HTMLarkdownOptions
    export let rerender: () => void

    const defaultElementsNoWhitespaceCollapse = new HTMLarkdown().options
        .elementsNoWhitespaceCollapse
    let ref: Element
    let hasElementsNoWhitespaceCollapse = false
</script>

<span bind:this={ref}>elementsNoWhitespaceCollapse:</span>
<input
    type="text"
    class={hasElementsNoWhitespaceCollapse ? 'error' : ''}
    value={JSON.stringify(defaultElementsNoWhitespaceCollapse)}
    on:input={(e) => {
        try {
            hasElementsNoWhitespaceCollapse = false
            options.elementsNoWhitespaceCollapse = JSON.parse(
                e.currentTarget.value.replaceAll("'", '"')
            )
            rerender()
        } catch (e) {
            hasElementsNoWhitespaceCollapse = true
        }
    }}
/>
<Popover triggerEvents={['hover']} referenceElement={ref}>
    <ElementsNoWhitespaceCollapseToolTip />
</Popover>
