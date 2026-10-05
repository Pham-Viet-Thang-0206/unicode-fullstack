// ## Bài 5

// Giả sử bạn có 10 API cần gọi nhưng muốn giới hạn tối đa chỉ 3 API chạy cùng lúc. Viết một hàm runWithLimit(tasks, limit) để đảm bảo điều này.
// Yêu cầu:

// - Chỉ chạy tối đa limit Promise cùng lúc.
// - Khi một Promise hoàn thành, một Promise mới được thêm vào.

const tasks = Array.from(
    { length: 10 },
    (_, i) => () =>
        new Promise((resolve) =>
            setTimeout(
                () => resolve(`Task ${i + 1} hoàn thành`),
                Math.random() * 3000,
            ),
        ),
);

const result = [];
const executing = new Set();
for (const task of tasks) {
    const processing = task().then((rsp) => {
        console.log(executing);
        executing.delete(processing);
        return rsp;
    });
    result.push(processing);
    executing.add(processing);
}
console.log(result);

async function runWithLimit(tasks, limit) {
    const result = [];
    const executing = new Set();
    for (const task of tasks) {
        const processing = task().then((rsp) => {
            executing.delete(processing);
            return rsp;
        });
        result.push(processing);
        executing.add(processing);
        if (executing.size >= limit) {
            await Promise.race(executing);
        }
    }
    return Promise.all(result);
}

runWithLimit(tasks, 3).then(console.log);
