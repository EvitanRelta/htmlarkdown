<script lang="ts">
    import { HTMLarkdown, type HTMLarkdownOptions } from 'htmlarkdown'
    import {
        AddTrailingLinebreakOption,
        CodeblockTrailingLinebreakOption,
        ElementsNoWhitespaceCollapseOption,
        HtmlEscapingModeOption,
        MaxPrettyTableWidthOption,
        ReverseAutolinksOption,
    } from './options'

    export let options: HTMLarkdownOptions
    export let rerender: () => void
    const props = { options, rerender }

    const defaultHtmlarkdown = new HTMLarkdown()
    const defaultMaxPrettyTableWidth = defaultHtmlarkdown.options.maxPrettyTableWidth
    const defaultElementsNoWhitespaceCollapse =
        defaultHtmlarkdown.options.elementsNoWhitespaceCollapse

    let hasElementsNoWhitespaceCollapse = false
</script>

<div class="content options-container">
    <div class="column">
        <div class="card">
            <AddTrailingLinebreakOption {...props} />
        </div>
    </div>
    <div class="column">
        <div class="card">
            <HtmlEscapingModeOption {...props} />
        </div>
    </div>
    <div class="column">
        <div class="card">
            <CodeblockTrailingLinebreakOption {...props} />
        </div>
    </div>
    <div class="column">
        <div class="card">
            <MaxPrettyTableWidthOption {...props} />
        </div>
    </div>
    <div class="column">
        <div class="card">
            <ElementsNoWhitespaceCollapseOption {...props} />
        </div>
    </div>
    <div class="column">
        <div class="card">
            <ReverseAutolinksOption {...props} />
        </div>
    </div>
</div>

<style>
    .options-container :global(input) {
        background-color: rgb(75, 75, 75);
    }
    .options-container :global(input.error) {
        border-color: darkred;
    }
    .options-container :global(input.error:focus) {
        outline-style: solid;
        outline-color: red;
    }

    .options-container :global(.tooltip-container) {
        width: 500px;
        background-color: black;
        padding: 10px;
        line-height: 1.3em;
        box-sizing: border-box;
    }

    .options-container :global(.tooltip-container pre) {
        background-color: rgb(50, 50, 50);
        padding: 10px;
        border-radius: 3px;
    }

    .options-container :global(.tooltip-container code) {
        background-color: rgb(50, 50, 50);
        padding: 0.15em;
        border-radius: 3px;
    }

    .content * {
        box-sizing: border-box;
    }
    /* Float four columns side by side */
    .column {
        float: left;
        width: 450px;
    }

    /* Style the counter cards */
    .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */
        margin: 10px;
        padding: 5px;
        /* text-align: center; */
        background-color: rgb(57, 57, 57);
    }

    /* Responsive columns - one column layout (vertical) on small screens */
    @media screen and (max-width: 600px) {
        .column {
            width: 100%;
            display: block;
        }
        .card {
            margin-bottom: 5px;
            margin-top: 5px;
        }
    }
</style>
