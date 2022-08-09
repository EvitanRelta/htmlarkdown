export type ReplacerCallback = (substring: string) => string
export type ReplacementArray = [string | RegExp, string | ReplacerCallback][]

export const applyReplacement = (replacementArr: ReplacementArray, text: string) =>
    replacementArr.reduce((acc, [search, replacement]) => {
        // I know both cases returns the same thing, but Typescript doesn't
        // accept the union of arguments between multiple overloaded-functions.
        if (typeof replacement === 'string') return acc.replaceAll(search, replacement)
        return acc.replaceAll(search, replacement)
    }, text)
