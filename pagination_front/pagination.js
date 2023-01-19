class Pagination {
    constructor (buttonWrapper, movePageCallback) {
        this.buttonWrapper = buttonWrapper;
        this.movePageCallback = movePageCallback
        this.numButton = parseInt(buttonWrapper.querySelector(".pageButtonSet").dataset.numbutton);
        this.totalCount = parseInt(buttonWrapper.querySelector(".pageButtonSet").dataset.totalcount);
        this.lo = 1;
        this.hi = this.numButton;
        this.crnt = 1;
        this.maxPage = parseInt(this.totalCount/this.numButton);
        this.initButtonWrapper();
    }

    initButtonWrapper() {
        this.buttonWrapper.querySelector(".firstButtonSet").addEventListener("click", async () => {
            this.movePage(1);
            this.moveButtonSet();
        });
        this.buttonWrapper.querySelector(".prevButtonSet").addEventListener("click", async () => {
            this.movePage(this.lo-1);
            this.moveButtonSet();
        });
        this.buttonWrapper.querySelector(".nextButtonSet").addEventListener("click", async () => {
            this.movePage(this.hi+1);
            this.moveButtonSet();
        });
        this.buttonWrapper.querySelector(".lastButtonSet").addEventListener("click", async () => {
            this.movePage(this.maxPage);
            this.moveButtonSet();
        });
        this.buttonWrapper.querySelectorAll(".pageButtonSet .pageButton").forEach(btn => {
            btn.addEventListener("click", e => {
                this.movePage(e.target.dataset.page);
            });
        });
    }

    async movePage(page) {
        if (page < 1) {
            this.movePage(1);
            return;
        } else if (page > this.maxPage) {
            this.movePage(this.maxPage);
            return;
        }
        this.movePageCallback(page);
        this.crnt = page;
        this.lo = parseInt((page-1)/this.numButton)*this.numButton + 1;
        this.hi = Math.min(this.lo + this.numButton - 1, this.maxPage);
    }

    moveButtonSet() {
        let p = this.lo;
        buttonWrapper.querySelectorAll(`.pageButtonSet .pageButton`).forEach(btn => {
            if (p <= this.maxPage) {
                btn.style.display = `inline-block`;
                btn.dataset.page = p;
                btn.textContent = p;
            } else {
                btn.style.display = `none`;
            }
            p++;
        });

    }
}

window.onload = () => {
    new Pagination(document.querySelector(`#buttonWrapper`), async page => {
        const param = { page };
        const response = await fetch(`${url}?${param}`, { method: `GET` });
        const json = await response.json();
        json.data.forEach(d => tbody.appendChild(drawTrTag(d)));
    });
}
