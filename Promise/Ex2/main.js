// ## Bài 2

// Giả lập một tình huống có 3 server API, bạn cần lấy dữ liệu từ server nhanh nhất.

function fetchFromServer1() {
    return new Promise((resolve) =>
        setTimeout(() => resolve("Server 1 Response"), 3000),
    );
}

function fetchFromServer2() {
    return new Promise((resolve) =>
        setTimeout(() => resolve("Server 2 Response"), 2000),
    );
}

function fetchFromServer3() {
    return new Promise((resolve) =>
        setTimeout(() => resolve("Server 3 Response"), 1000),
    );
}

// Yêu cầu: Sử dụng Promise.race để lấy kết quả từ server phản hồi nhanh nhất

const fastData = () => {
    return Promise.race([
        fetchFromServer1(),
        fetchFromServer2(),
        fetchFromServer3(),
    ]);
};

fastData().then((data) => {
    console.log(data);
});
