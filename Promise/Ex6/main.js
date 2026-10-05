// ## Bài 6

// Viết một hàm PromiseTimeout để tự động reject nếu promise chạy quá lâu.

function PromiseTimeout(promise, ms) {
    // Viết code ở đây
    const timer = new Promise((resolve,reject) => {
        setTimeout(() => reject(new Error("Timeout Error!")), ms);
    });
    return Promise.race([timer, promise]);
}

const longTask = new Promise((resolve) =>
    setTimeout(() => resolve("Xong!"), 5000),
);

PromiseTimeout(longTask, 2000)
    .then(console.log)
    .catch((error) => console.log(error.message));

// Kết quả mong muốn:

// - Nếu longTask mất ≤ 2 giây, in "Xong!"
// - Nếu longTask mất > 2 giây, in "Timeout Error!"
