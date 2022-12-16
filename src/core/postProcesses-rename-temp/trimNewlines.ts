import type { Postprocess } from '../../types'

export const trimNewlines: Postprocess = (str: string) => str.replaceAll(/^\n+|\n+$/g, '')
