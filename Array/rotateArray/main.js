// ## Bài 3: Xoay mảng

// Viết một hàm nhận vào một mảng và một số nguyên bước X.
// Hãy dịch chuyển các phần tử của mảng sang phải X vị trí.
// Các phần tử bị đẩy ra khỏi cuối mảng sẽ được quay trở lại đầu mảng.
// (Ví dụ: mảng [1, 2, 3, 4, 5] với X = 2 sẽ trở thành [4, 5, 1, 2, 3]).

const rotateArray = (arr, x) => {
    if (!Array.isArray(arr)) {
        return "Invalid array";
    }
    if (arr.length === 0) {
        return [];
    }
    const rotateArr = [];
    x = x % arr.length;
    for (let i = 0; i < arr.length; i++) {
        if (i + x < arr.length) {
            rotateArr[i + x] = arr[i];
        } else {
            let pos = i + x - arr.length;
            rotateArr[pos] = arr[i];
        }
    }
    return rotateArr;
};

console.log(rotateArray([1, 2, 3, 4, 5], 2));
console.log(rotateArray([1, 2, 3, 4, 5], 1));
// [5, 1, 2, 3, 4]

console.log(rotateArray([1, 2, 3, 4, 5], 3));
// [3, 4, 5, 1, 2]

console.log(rotateArray([1, 2, 3, 4, 5], 0));
// [1, 2, 3, 4, 5]

console.log(rotateArray([1, 2, 3, 4, 5], 5));
// [1, 2, 3, 4, 5]

console.log(rotateArray([1, 2, 3, 4, 5], 7));
// [4, 5, 1, 2, 3]

console.log(rotateArray([1, 2], 1));
// [2, 1]

console.log(rotateArray([10], 5));
// [10]

console.log(rotateArray([-1, -2, -3, -4, -5], 2));
// [-4, -5, -1, -2, -3]

console.log(rotateArray([1, 1, 2, 2, 3], 2));
// [2, 3, 1, 1, 2]
