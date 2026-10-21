const SERVER_API = "https://dummyjson.com";
const LIMIT = 10;
const postContent = document.querySelector(".js-post-list");
const modalBackdrop = document.querySelector(".modal-backdrop");

const app = {
    order: "desc",
    q: "",
    total: 0,
    currentPage: 1,
    sibling: 2,
    totalPages: 0,
    async getPosts() {
        let skip = (this.currentPage - 1) * LIMIT;
        const response = await fetch(
            `${SERVER_API}/posts/search?q=${this.q}&sortBy=id&order=${this.order}&limit=${LIMIT}&skip=${skip}`,
        );
        const { posts, total } = await response.json();
        this.total = total;
        this.totalPages = Math.ceil(this.total / LIMIT);
        this.render(posts);
    },
    async getPostsById(id) {
        const response = await fetch(`${SERVER_API}/posts/${id}`);
        return await response.json();
    },
    render(posts) {
        const postContent = document.querySelector(".js-post-list");
        let html = posts
            .map((post) => {
                return `<div class="mb-3 pb-3 border-gray-200 border-b">
                <h3 class="mb-2 text-xl">${post.title}</h3>
                <p>${post.body}</p>
                <div class="flex gap-3 mt-3">
                    ${post.tags
                        .map((tag) => {
                            return `<span class="px-3 py-1 bg-white border border-gray-200">${tag}</span>`;
                        })
                        .join("")}
                </div>
                <button class="inline-block px-5 py-1.5 mt-5 rounded-full border border-gray-300 text-sm hover:bg-green-400 hover:text-white" data-id="${post.id}">Xem chi tiết</button>
            </div>`;
            })
            .join("");
        html += this.displayPagination(
            this.currentPage,
            this.totalPages,
            this.sibling,
        );
        postContent.innerHTML = html;
    },
    paginationEvent() {
        postContent.addEventListener("click", (e) => {
            const item = e.target.closest("[data-page]");
            if (!item) return;
            this.currentPage = Number(item.dataset.page);
            this.getPosts();
        });
    },
    debounce(callback, timeout = 500) {
        let timeoutID;
        return (...args) => {
            if (timeoutID) {
                clearTimeout(timeoutID);
            }
            timeoutID = setTimeout(() => {
                callback(...args);
            }, timeout);
        };
    },
    searchEvent() {
        const searchEl = document.querySelector(".js-search");
        searchEl.addEventListener(
            "input",
            this.debounce(() => {
                this.q = searchEl.value;
                this.currentPage = 1;
                this.getPosts();
            }, 1000),
        );
    },
    sortEvent() {
        const searchEl = document.querySelector(".js-search");
        const newPost = document.querySelector(".newest-post");
        const oldPost = document.querySelector(".oldest-post");
        const newSort = newPost.dataset.sort;
        const oldSort = oldPost.dataset.sort;
        newPost.addEventListener("click", () => {
            newPost.classList.add("bg-yellow-300");
            oldPost.classList.remove("bg-yellow-300");
            this.order = newSort;
            this.currentPage = 1;
            this.getPosts();
        });
        oldPost.addEventListener("click", () => {
            oldPost.classList.add("bg-yellow-300");
            newPost.classList.remove("bg-yellow-300");
            this.order = oldSort;
            this.currentPage = 1;
            this.getPosts();
        });
    },
    displayPagination(curr, largest, sibling) {
        const arr4Display = [];
        // bên trái
        if (curr > 1) {
            arr4Display.push(
                `<li class="cursor-pointer" data-page="${curr - 1}">Trang trước</li>`,
            );
        }
        if (curr - sibling <= 2) {
            for (let i = 1; i < curr; i++)
                arr4Display.push(
                    `<li class="cursor-pointer" data-page="${i}">${i}</li>`,
                );
        } else {
            arr4Display.push(
                `<li class="cursor-pointer" data-page="${1}">1</li>`,
            );
            arr4Display.push("...");
            for (let i = curr - sibling; i < curr; i++)
                arr4Display.push(
                    `<li class=" cursor-pointer" data-page="${i}">${i}</li>`,
                );
        }
        arr4Display.push(
            `<li class="px-3 py-1 bg-yellow-300 border border-yellow-300 font-semibold text-center">${curr}</li>`,
        );
        // bên phải
        if (curr + sibling >= largest - 1) {
            for (let i = curr + 1; i <= largest; i++)
                arr4Display.push(
                    `<li class="cursor-pointer" data-page="${i}">${i}</li>`,
                );
        } else {
            for (let i = curr + 1; i <= curr + sibling; i++)
                arr4Display.push(
                    `<li class="cursor-pointer" data-page="${i}">${i}</li>`,
                );
            arr4Display.push("...");
            arr4Display.push(
                `<li class="cursor-pointer" data-page="${largest}">${largest}</li>`,
            );
        }
        if (curr < largest) {
            arr4Display.push(
                `<li class="cursor-pointer next" data-page="${curr + 1}">Trang sau</li>`,
            );
        }
        return `<ul class="flex gap-5 justify-center mt-10 pagination">${arr4Display.join("")}</ul>`;
    },
    openModalEvent() {
        const modalTitle = modalBackdrop.querySelector(".modal-title");
        const modalContent = modalBackdrop.querySelector(".modal-content");
        if (!modalTitle || !modalContent) return;
        postContent.addEventListener("click", async (e) => {
            const btn = e.target.closest("[data-id]");
            if (!btn) return;
            const id = btn.dataset.id;
            const post = await this.getPostsById(id);
            modalTitle.innerText = post.title;
            modalContent.innerText = post.body;
            modalBackdrop.classList.add("show");
        });
        modalBackdrop.addEventListener("click", (e) => {
            if (
                e.target === modalBackdrop ||
                e.target.closest(".modal-close")
            ) {
                modalBackdrop.classList.remove("show");
            }
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                modalBackdrop.classList.remove("show");
            }
        });
    },
    start() {
        this.sortEvent();
        this.paginationEvent();
        this.getPosts();
        this.searchEvent();
        this.openModalEvent();
    },
};
app.start();