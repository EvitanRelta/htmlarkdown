import { ContentAddonFunction, ReplacementObj } from '../types'

export const setForceHtml = (value: string | ContentAddonFunction): ReplacementObj => ({
    childOptions: { forceHtml: true },
    value,
})
