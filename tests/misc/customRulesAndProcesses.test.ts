import _ from 'lodash'
import type { PostProcess, PreProcess, Rule, TextProcess } from '../../src'
import { HTMLarkdown } from '../../src'

test.concurrent('Custom Rules & Processes - pre-process', async () => {
    const customPreProcess: PreProcess = (containerElement) => containerElement
    const htmlarkdown = new HTMLarkdown({ preProcesses: [customPreProcess] })
    expect(_.isEqual(htmlarkdown.options.preProcesses, [customPreProcess])).toBe(true)
    expect(_.isEqual(htmlarkdown.options.rules, HTMLarkdown.defaultRules)).toBe(true)
    expect(_.isEqual(htmlarkdown.options.textProcesses, HTMLarkdown.defaultTextProcesses)).toBe(
        true
    )
    expect(_.isEqual(htmlarkdown.options.postProcesses, HTMLarkdown.defaultPostProcesses)).toBe(
        true
    )
})

test.concurrent('Custom Rules & Processes - rule', async () => {
    const customRule: Rule = {
        filter: [() => true],
        replacement: () => 'CUSTOM_RULE',
    }
    const htmlarkdown = new HTMLarkdown({ rules: [customRule] })
    expect(_.isEqual(htmlarkdown.options.preProcesses, HTMLarkdown.defaultPreProcesses)).toBe(true)
    expect(_.isEqual(htmlarkdown.options.rules, [customRule])).toBe(true)
    expect(_.isEqual(htmlarkdown.options.textProcesses, HTMLarkdown.defaultTextProcesses)).toBe(
        true
    )
    expect(_.isEqual(htmlarkdown.options.postProcesses, HTMLarkdown.defaultPostProcesses)).toBe(
        true
    )
})

test.concurrent('Custom Rules & Processes - text-process', async () => {
    const customTextProcess: TextProcess = () => 'CUSTOM_TEXT_PROCESS'
    const htmlarkdown = new HTMLarkdown({ textProcesses: [customTextProcess] })
    expect(_.isEqual(htmlarkdown.options.preProcesses, HTMLarkdown.defaultPreProcesses)).toBe(true)
    expect(_.isEqual(htmlarkdown.options.rules, HTMLarkdown.defaultRules)).toBe(true)
    expect(_.isEqual(htmlarkdown.options.textProcesses, [customTextProcess])).toBe(true)
    expect(_.isEqual(htmlarkdown.options.postProcesses, HTMLarkdown.defaultPostProcesses)).toBe(
        true
    )
})

test.concurrent('Custom Rules & Processes - post-process', async () => {
    const customPostProcess: PostProcess = () => 'CUSTOM_POST_PROCESS'
    const htmlarkdown = new HTMLarkdown({ postProcesses: [customPostProcess] })
    expect(_.isEqual(htmlarkdown.options.preProcesses, HTMLarkdown.defaultPreProcesses)).toBe(true)
    expect(_.isEqual(htmlarkdown.options.rules, HTMLarkdown.defaultRules)).toBe(true)
    expect(_.isEqual(htmlarkdown.options.textProcesses, HTMLarkdown.defaultTextProcesses)).toBe(
        true
    )
    expect(_.isEqual(htmlarkdown.options.postProcesses, [customPostProcess])).toBe(true)
})
