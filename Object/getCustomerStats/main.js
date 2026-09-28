// Xây dựng hàm `getCustomerStats(orders)`

// - Trả về Object, lấy customerId làm key
// - Thống kê: Tên, số tiền đã chi tiêu cho các đơn hàng completed, mảng chứa các sản phẩm duy nhất mà họ đã mua

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

// const result = orders.reduce((result, order) => {
//     if (order.status === "completed") {
//         let uniquesProduct = [];
//         let totalSpent = 0;
//         for (const item of order.items) {
//             if (order.coupon === "SUMMER10") {
//                 totalSpent += item.quantity * item.price * 0.9;
//             } else if (order.coupon === "VIP20") {
//                 totalSpent += item.quantity * item.price * 0.8;
//             } else {
//                 totalSpent += item.quantity * item.price;
//             }
//             uniquesProduct.push(item.name);
//             result[order.customerId] = {
//                 name: order.customerName,
//                 totalSpent: totalSpent,
//                 uniquesProduct: uniquesProduct,
//             };
//         }
//     }
//     return result;
// }, {});
// console.log(result);

//refactor
function getCustomerStats(orders) {
    return orders.reduce((result, order) => {
        if (order.status === "completed") {
            if (!result[order.customerId]) {
                result[order.customerId] = {
                    name: order.customerName,
                    totalSpent: 0,
                    uniquesProduct: [],
                };
            }
            for (const item of order.items) {
                let total = item.quantity * item.price;
                if (order.coupon === "SUMMER10") {
                    total *= 0.9;
                } else if (order.coupon === "VIP20") {
                    total *= 0.8;
                }
                result[order.customerId].totalSpent += total;
                result[order.customerId].uniquesProduct.push(item.name);
            }
        }
        return result;
    }, {});
}
console.log(getCustomerStats(orders));
