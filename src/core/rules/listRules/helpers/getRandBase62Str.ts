const base62CharSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const getRandInt = () => Math.floor(Math.random() * 62)
const getBase62Char = (i: number) => base62CharSet[i]

/**
 * Gets a random base-62 string.
 * @param strLength The length of the output string.
 * @returns A random base-62 string of length `strLength`.
 */
export const getRandBase62Str = (strLength: number) =>
    Array(strLength).fill(undefined).map(getRandInt).map(getBase62Char).join('')
