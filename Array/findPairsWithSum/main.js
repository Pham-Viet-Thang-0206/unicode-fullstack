// ## Bài 2: Tìm cặp số có tổng bằng K

// Cho một mảng số nguyên và một số nguyên K.
// Hãy tìm tất cả các cặp số trong mảng sao cho tổng của chúng bằng đúng K.
//  Kết quả trả về là một mảng chứa các mảng con,
// mỗi mảng con là một cặp số (ví dụ: nếu mảng là [1, 2, 3, 4] và K = 5,
// kết quả là [[1, 4], [2, 3]]).

const findPairsWithSum = (arr, k) => {
    if (!Array.isArray(arr)) {
        return "Invalid array";
    }
    let pairs = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === k) {
                pairs.push([arr[i], arr[j]]);
            }
        }
    }
    return pairs;
};

console.log(findPairsWithSum([1, 2, 3, 4], 5));
console.log(findPairsWithSum([1, 2, 3, 4, 5], 6));
console.log(findPairsWithSum([-3, 1, 2, 4, 5], 2));
