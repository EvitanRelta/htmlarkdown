import type { HTMLarkdown } from '../core'

/**
 * A function that takes in a `HTMLarkdown` instance, and configures it by
 * mutating the given instance.
 */
export type Plugin = (htmlarkdownInstance: HTMLarkdown) => void
