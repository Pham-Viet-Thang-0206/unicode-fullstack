const orders = [
    {
        orderId: "ORD001",
        customerId: "CUST101",
        customerName: "An",
        items: [
            {
                name: "Laptop",
                category: "Electronics",
                quantity: 1,
                price: 1200,
            },
            { name: "Mouse", category: "Electronics", quantity: 2, price: 25 },
        ],
        status: "completed",
        coupon: "SUMMER10",
    },
    {
        orderId: "ORD002",
        customerId: "CUST102",
        customerName: "Bình",
        items: [
            { name: "Shirt", category: "Apparel", quantity: 3, price: 30 },
            { name: "Shoes", category: "Apparel", quantity: 1, price: 80 },
        ],
        status: "completed",
        coupon: null,
    },
    {
        orderId: "ORD003",
        customerId: "CUST101",
        customerName: "An",
        items: [
            {
                name: "Keyboard",
                category: "Electronics",
                quantity: 1,
                price: 75,
            },
        ],
        status: "pending",
        coupon: null,
    },
    {
        orderId: "ORD004",
        customerId: "CUST103",
        customerName: "Chi",
        items: [
            { name: "Book", category: "Books", quantity: 5, price: 15 },
            {
                name: "Laptop",
                category: "Electronics",
                quantity: 1,
                price: 1200,
            },
        ],
        status: "completed",
        coupon: "VIP20",
    },
];

// ## Bài 1: Tính tổng doanh thu thực tế của **từng danh mục**

// Xây dựng hàm **`getRevenueByCategory(orders)`**

// - Chỉ tính các đơn hàng có trạng thái **`*completed*`**
// - Phải trừ tiền khi có mã giảm giá
//     - SUMMER10: Giảm 10%
//     - VIP20: Giảm 20%

//Output
// {
//   Electronics: 1125,
//   Apparel: 170,
//   Books: 60
// }

// const result = {};
// for (order of orders) {
//     if (order.status === "completed") {
//         for (item of order.items) {
//             if (!result[item.category]) {
//                 result[item.category] = 0;
//             }
//             if (order.coupon === "SUMMER10") {
//                 result[item.category] += item.quantity * item.price * 0.9;
//             } else if (order.coupon === "VIP20") {
//                 result[item.category] += item.quantity * item.price * 0.8;
//             } else {
//                 result[item.category] += item.quantity * item.price;
//             }
//         }
//     }
// }
// console.log(result);

function getRevenueByCategory(orders) {
    const result = orders.reduce((result, order) => {
        if (order.status === "completed") {
            for (const item of order.items) {
                if (!result[item.category]) {
                    result[item.category] = 0;
                }
                let total = item.quantity * item.price;
                if (order.coupon === "SUMMER10") {
                    total *= 0.9;
                } else if (order.coupon === "VIP20") {
                    total *= 0.8;
                }
                result[item.category] += total;
            }
        }
        return result;
    }, {});
    return result;
}
console.log(getRevenueByCategory(orders));
