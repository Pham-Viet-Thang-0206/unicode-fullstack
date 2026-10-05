// ## Bài 1:

// Cho 3 hàm sau:

// Yêu cầu:

// - Dùng Promise.all để lấy kết quả từ cả 3 Promise.
// - Tính tổng thời gian chạy của cả 3 Promise.

function fetchUser() {
    return new Promise((resolve) =>
        setTimeout(() => resolve("User Data"), 2000),
    );
}

function fetchPosts() {
    return new Promise((resolve) =>
        setTimeout(() => resolve("Post Data"), 3000),
    );
}

function fetchComments() {
    return new Promise((resolve) =>
        setTimeout(() => resolve("Comment Data"), 1000),
    );
}
// - Dùng Promise.all để lấy kết quả từ cả 3 Promise.
// - Tính tổng thời gian chạy của cả 3 Promise.
const takeTime = () => {
    const start = Date.now();
    Promise.all([fetchUser(), fetchPosts(), fetchComments()])
        .then((data) => {
            const end = Date.now();
            console.log("Data:", data);
            console.log("Time:", end - start);
        })
        .catch((err) => console.log(err));
};
takeTime();
