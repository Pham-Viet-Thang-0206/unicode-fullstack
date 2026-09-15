// Bài 1: Tìm phần tử lớn nhất và nhỏ nhất

// Cho một mảng số nguyên bất kỳ. 
// Hãy viết chương trình tìm ra số lớn nhất và số nhỏ nhất trong mảng 
// mà không sử dụng các hàm toán học có sẵn như Math.max hay Math.min

const findMinMax = (arr) => {
    if (!Array.isArray(arr)) {
        return "Invalid array";
    }
    let min = arr[0];
    let max = arr[0];
    for (const number of arr) {
        if (number < arr[0]) {
            min = number;
        }
        if (number > arr[0]) {
            max = number;
        }
    }
    return {
        min: min,
        max: max,
    };
};

console.log(findMinMax([5, 2, 8, 1, 9]));
console.log(findMinMax([40, 30, 20, 10]));
console.log(findMinMax([-5, -2, -10, -1]));
