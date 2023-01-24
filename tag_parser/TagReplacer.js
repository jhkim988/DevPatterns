class TagReplacer {
    constructor(tag) {
        this.tag = tag;
        this.regex = /\$\{.*\}/g;
    }

    replace(param) {
        const nodeIter = document.createNodeIterator(
            this.tag
            , NodeFilter.SHOW_ALL
            , node => {
                return node.nodeType == Node.ELEMENT_NODE || node.nodeType == Node.TEXT_NODE;
            });
        let crnt;
        while (crnt = nodeIter.nextNode()) {
            if (crnt.nodeType == Node.ELEMENT_NODE) {
                crnt.getAttributeNames().forEach(attrName => {
                    let attrValue = crnt.getAttribute(attrName);
                    const match = attrValue.match(this.regex);
                    match && match.forEach(val => {
                        let sub = val.substring(2, val.length-1);
                        attrValue = attrValue.replaceAll(val, param[sub]);
                    });
                    crnt.setAttribute(attrName, attrValue);
                });
            } else if (crnt.nodeType == Node.TEXT_NODE) {
                let text = crnt.nodeValue;
                const match = text.match(this.regex);
                match && match.forEach(val => {
                    let sub = val.substring(2, val.length-1);
                    text = text.replaceAll(val, param[sub]);
                });
                crnt.textContent = text;
            }
        }
    }
}

// Example
window.onload = () => {
    const row = document.querySelector("tbody .row");
    const tagReplacer = new TagReplacer(row);
    tagReplacer.replace({
        thumbnail: '썸네일'
        , id: '아이디'
        , category: '카테고리'
        , title: '제목'
        , author: '작가'
        , publisher: '출판사'
        , price: 10000
        , publishedAt: '2022-01-19'
        , page: 133
        , code: 'bestseller'
        , createdAt: '2022-01-19'
    });
}