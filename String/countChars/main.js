// 2. **Đếm số lần xuất hiện của ký tự**
// - **Yêu cầu:** Viết hàm đếm và trả về số lần xuất hiện của từng ký tự trong chuỗi dưới dạng một Object.
// - **Ví dụ:** `countChars("hello")` → `{ h: 1, e: 1, l: 2, o: 1 }`
// - Gợi ý: Tìm hiểu 1 chút về khởi tạo object, thêm key-value vào object

const countChars = (str) => {
    if (typeof str !== "string") {
        return "invalid input";
    }
    // khởi tạo object rỗng
    const count = {};
    // duyệt chuỗi 
    for (let i = 0; i < str.length; i++) {
        let char = str.charAt(i);
        // nếu tồn tại rồi thì tăng lên 1
        if (count[char]) {
            count[char]++;
        } 
        // nếu chưa có thì để là 1
        else {
            count[char] = 1;
        }
    }
    return count;
};

console.log(countChars("hello"));
