// ## Bài 3

// Viết một hàm retry(fn, times) thực thi một Promise function fn, nếu thất bại thì thử lại tối đa times lần.

function retry(fn, times) {
    // Viết code ở đây
    return fn()
        .then((data) => data)
        .catch((err) => {
            if (times === 1) {
                throw err;
            }
            return retry(fn, times - 1);
        });
}

let failingPromise = () => {
    return new Promise((resolve, reject) => {
        const random = Math.random();

        console.log("Random:", random);

        random > 0.7 ? resolve("Thành công") : reject("Thất bại");
    });
};

retry(failingPromise, 3).then(console.log).catch(console.error);
