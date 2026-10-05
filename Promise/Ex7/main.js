// ## Bài 7

// Viết một hàm retryWithBackoff(fn, retries, delay) giúp thực hiện lại Promise thất bại, với mỗi lần retry sẽ tăng delay gấp đôi.

function retryWithBackoff(fn, retries, delay) {
    // Viết code ở đây
    return fn()
        .then((data) => data)
        .catch((err) => {
            if (retries === 1) {
                throw err;
            }
            return wait(delay).then(() => {
                return retryWithBackoff(fn, retries-1, delay*2);
            });
        });
}
// tạo wait để delay
function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const failingTask = () => {
    return new Promise((resolve, reject) => {
        Math.random() > 0.8
            ? resolve("Thành công!")
            : reject("Thất bại, thử lại...");
    });
};

retryWithBackoff(failingTask, 5, 1000).then(console.log).catch(console.error);

// Yêu cầu:

// - Nếu thất bại, thử lại sau 1000ms, 2000ms, 4000ms, ... cho đến retries lần.
// - Nếu vẫn thất bại sau retries lần, reject.
