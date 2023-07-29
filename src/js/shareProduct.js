export const shareProduct = () => {
    const buildUrl = (url, links) => {
        links.forEach(element => {
            let anchorUrl = element.href;
            let urlEncoded = encodeURIComponent(url);
            element.href = anchorUrl + urlEncoded;
        });
    }
    const productLoc = location;
    const shareLinks = document.querySelectorAll('.aaog-share-social-media a');
    buildUrl(productLoc, shareLinks)
}