import type { PostProcess } from '../../types'

export const trimNewlines: PostProcess = (str: string) => str.replaceAll(/^\n+|\n+$/g, '')
