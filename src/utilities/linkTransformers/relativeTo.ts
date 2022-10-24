import RelateUrl from 'relateurl'

/** A higher-order-function for converting absolute URLs to URLs path-relative to `baseUrl`. */
export const relativeTo = (baseUrl: string) => {
    const relateUrl = new RelateUrl(baseUrl, {
        schemeRelative: false, // Prevents collapsing of http/https schemes
        output: RelateUrl.PATH_RELATIVE,
    })
    return (link: string) => (link === '' ? '' : relateUrl.relate(link))
}
