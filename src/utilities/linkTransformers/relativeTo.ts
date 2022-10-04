import RelateUrl from 'relateurl'

/** A higher-order-function for converting absolute URLs to URLs root-relative to `baseUrl`. */
export const relativeTo = (baseUrl: string) => {
    const relateUrl = new RelateUrl(baseUrl, {
        schemeRelative: false, // Prevents collapsing of http/https schemes
        output: RelateUrl.ROOT_RELATIVE,
    })
    return (link: string) => (link === '' ? '' : relateUrl.relate(link))
}
