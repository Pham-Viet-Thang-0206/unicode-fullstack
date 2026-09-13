// 3. **Chuyển đổi sang CamelCase**
// - **Yêu cầu:** Viết hàm chuyển đổi một chuỗi dạng gạch nối (`snake_case` hoặc `kebab-case`) sang dạng `camelCase`.
// - Ví dụ**:** `toCamelCase("data_user_name")` ⇒ `"dataUserName"`
// b1: lấy vị trí của dấu - hoặc _
// b2:chuỗi mới bằng chuỗi cũ xóa dấu - hoặc _ và viết hoa vị trí của - hoặc _ cộng 1 rồi cộng với phần còn lại
const toCamelCase = (str) => {
    if(typeof str !== "string") {
        return "Invalid input"
    }
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) === "-" || str.charAt(i) === "_") {
            const pos = i;
            str =
                str.slice(0, pos) +
                str.charAt(pos + 1).toUpperCase() +
                str.slice(pos + 2);
        }
    }
    return str;
};


console.log(toCamelCase("data_user_name"));
console.log(toCamelCase("data-user-name"));
console.log(toCamelCase("hello_world"));
console.log(toCamelCase("hello-world"));
console.log(toCamelCase("user_first_name"));
console.log(toCamelCase("user-first-name"));
console.log(toCamelCase("first_name"));
console.log(toCamelCase("first-name"));
console.log(toCamelCase("a_b_c_d"));
console.log(toCamelCase("a-b-c-d"));
console.log(toCamelCase("username"));
console.log(toCamelCase(""));
