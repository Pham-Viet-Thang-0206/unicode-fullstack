// 1. **Kiểm tra chuỗi đối xứng**
// - **Yêu cầu:** Viết hàm kiểm tra xem một chuỗi có phải là chuỗi đối xứng hay không (đọc xuôi hay đọc ngược đều giống nhau, bỏ qua khoảng trắng và chữ hoa/thường).
// - **Ví dụ:** `isPalindrome("Race car")` ⇒ `true`
// b1: làm cho đầu vào không còn dấu cách và viết thường
// b2: đảo ngược chuỗi đầu vào
// b3: so sánh xem có giống chuỗi chưa đảo ngược không

const isPalindrome = (str) => {
    if (typeof str !== "string") {
        return "Invalid input";
    }

    // xóa dấu cách và viết thường hết
    str = str.replaceAll(" ", "").toLowerCase();
    // đảo ngược chuỗi
    let newStr = "";
    for (let i = str.length - 1; i >= 0; i--) {
        newStr += str.charAt(i);
    }
    // so sánh
    return str === newStr;
};

console.log(isPalindrome("Race car"));


