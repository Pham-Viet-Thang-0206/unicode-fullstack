// ## Bài 4

// Giả sử có một danh sách các hàm trả về Promise. Hãy viết một hàm runInSequence(tasks) để thực thi từng Promise theo thứ tự.
// Output mong muốn:

// ["Task 1 hoàn thành", "Task 2 hoàn thành", "Task 3 hoàn thành"];

const tasks = [
    () =>
        new Promise((resolve) =>
            setTimeout(() => resolve("Task 1 hoàn thành"), 2000),
        ),
    () =>
        new Promise((resolve) =>
            setTimeout(() => resolve("Task 2 hoàn thành"), 1000),
        ),
    () =>
        new Promise((resolve) =>
            setTimeout(() => resolve("Task 3 hoàn thành"), 1500),
        ),
];

// const completeTask = (task) => {
//     return new Promise((resolve) => {
//         task().then((data) => resolve(data));
//     });
// };

// const takeTask = (tasks) => {
//     const result = [];
//     return new Promise((resolve) => {
//         completeTask(tasks[0])
//             .then((data) => {
//                 result.push(data);
//                 return completeTask(tasks[1]);
//             })
//             .then((data) => {
//                 result.push(data);
//                 return completeTask(tasks[2]);
//             })
//             .then((data) => {
//                 result.push(data);
//                 resolve(result);
//             });
//     });
// };
// takeTask(tasks).then((data) => {
//     console.log(data);
// });

function runInSequence(tasks) {
    const result = [];
    let promise = Promise.resolve();
    for (let task of tasks) {
        promise = promise
            .then(() => task())
            .then((data) => {
                result.push(data);
            });
    }
    return promise.then(() => result);
}

runInSequence(tasks).then(console.log);
