export const unindent = (str: string, unindentSize = 2) =>
    str.replaceAll(new RegExp(`^ {${unindentSize}}`, 'gm'), '')
