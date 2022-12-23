/**
 * Undents a string by removing its leading spaces.
 * @param str String to unindent.
 * @param indentSize The number of spaces to unindent by.
 * @returns The unindented string.
 */
export const unindent = (str: string, unindentSize = 2) =>
    str.replaceAll(new RegExp(`^ {${unindentSize}}`, 'gm'), '')
