import RelateUrl from 'relateurl'

/** A higher-order-function for converting URLs relative to `baseUrl` to absolute URLs. */
export const absoluteFrom = (baseUrl: string) => {
    const relateUrl = new RelateUrl(baseUrl, {
        schemeRelative: false, // Prevents collapsing of http/https schemes
        output: RelateUrl.ABSOLUTE,
    })
    return (link: string) => (link === '' ? '' : relateUrl.relate(link))
}
