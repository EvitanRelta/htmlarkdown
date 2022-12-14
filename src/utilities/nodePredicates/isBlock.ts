// prettier-ignore
export const blockTagNames = [
    'ADDRESS', 'ARTICLE', 'ASIDE', 'AUDIO', 'BLOCKQUOTE', 'BODY', 'CANVAS', 'CENTER', 'DD', 
    'DIR', 'DIV', 'DL', 'DT', 'FIELDSET', 'FIGCAPTION', 'FIGURE', 'FOOTER', 'FORM', 'FRAMESET', 
    'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'HEADER', 'HGROUP', 'HR', 'HTML', 'ISINDEX', 'LI', 
    'MAIN', 'MENU', 'NAV', 'NOFRAMES', 'NOSCRIPT', 'OL', 'OUTPUT', 'P', 'PRE', 'SECTION', 
    'TABLE', 'TBODY', 'TD', 'TFOOT', 'TH', 'THEAD', 'TR', 'UL'
]

/**
 * Checks if a node is a block-element.
 * @param node Node to check.
 * @returns Whether `node` is a block-element.
 */
export const isBlock = (node: Node) => blockTagNames.includes(node.nodeName)
