<script lang="ts">
    import type { HTMLarkdownOptions } from 'htmlarkdown'
    import Popover from 'svelte-easy-popover'
    import { RAImagesToolTip, RATextUrlsToolTip, ReverseAutolinksToolTip } from './tooltips'

    export let options: HTMLarkdownOptions
    export let rerender: () => void

    let refReverseAutolinks, refRAImages, refRATextUrls: Element
</script>

<span style="margin: 0;" bind:this={refReverseAutolinks}>reverseAutolinks:</span>
<Popover triggerEvents={['hover']} referenceElement={refReverseAutolinks}>
    <ReverseAutolinksToolTip />
</Popover>
<ul style="margin: 0">
    <li>
        <span bind:this={refRAImages}>images:</span>
        <input
            type="checkbox"
            checked={options.reverseAutolinks.images}
            on:input={(e) => {
                options.reverseAutolinks.images = e.currentTarget.checked
                rerender()
            }}
        />
        <Popover triggerEvents={['hover']} referenceElement={refRAImages}>
            <RAImagesToolTip />
        </Popover>
    </li>
    <li>
        <span bind:this={refRATextUrls}>textUrls:</span>
        <input
            type="checkbox"
            checked={options.reverseAutolinks.textUrls}
            on:input={(e) => {
                options.reverseAutolinks.textUrls = e.currentTarget.checked
                rerender()
            }}
        />
        <Popover triggerEvents={['hover']} referenceElement={refRATextUrls}>
            <RATextUrlsToolTip />
        </Popover>
    </li>
</ul>
