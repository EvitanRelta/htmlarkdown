/** Removes all consecutive `\n` characters at the end of the string. */
export const trimTrailingNewlines = (str: string) => str.replace(/\n+$/, '')
