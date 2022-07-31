export const indent = (str: string, indentSize = 2) => str.replaceAll(/^/gm, ' '.repeat(indentSize))
