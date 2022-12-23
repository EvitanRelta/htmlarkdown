import type { PostProcess } from '../../types'

/** Trims leading and trailing newlines. */
export const trimNewlines: PostProcess = (str: string) => str.replaceAll(/^\n+|\n+$/g, '')
