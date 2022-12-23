/**
 * Indents a string with spaces.
 * @param str String to indent.
 * @param indentSize The number of spaces to indent by.
 * @returns The indented string.
 */
export const indent = (str: string, indentSize = 2) => str.replaceAll(/^/gm, ' '.repeat(indentSize))
