export const shareProduct = () => {
    const buildUrl = (url, links) => {
        links.forEach(element => {
            const anchorUrl = element.href;
            const urlEncoded = encodeURIComponent(url);            
            if(!element.classList.contains('aaog-share-email')) {
                element.href = anchorUrl + urlEncoded;
            } else {
                const subjectText = document.querySelector('h1').textContent
                element.href = anchorUrl + `subject=${subjectText}&body=${url}`;
            }

        });
    }
    const productLoc = location;
    const shareLinks = document.querySelectorAll('.aaog-share-social-media a');
    buildUrl(productLoc, shareLinks)
}