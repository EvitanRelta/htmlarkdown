import type { HTMLarkdown } from '../core'

/**
 * A function that takes in a `HTMLarkdown` instance, and configures it by
 * mutating the given instance.
 * @param htmlarkdownInstance The `HTMLarkdown` instance to configure.
 */
export type Plugin = (htmlarkdownInstance: HTMLarkdown) => void
