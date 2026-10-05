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
    const DISCOUNT_RATES = { SUMMER10: 0.9, VIP20: 0.8 };
    const rawStats = orders.reduce((result, order) => {
        if (order.status !== "completed") return result;
        result[order.customerId] ??= {
            name: order.customerName,
            totalSpent: 0,
            uniqueProducts: new Set(),
        };
        const rate = DISCOUNT_RATES[order.coupon] || 1;
        for (const { name, price, quantity } of order.items) {
            const total = price * quantity * rate;
            result[order.customerId].totalSpent += total;
            result[order.customerId].uniqueProducts.add(name);
        }
        return result;
    }, {});
    Object.values(rawStats).forEach((customer) => {
        customer.totalSpent = Math.round(customer.totalSpent * 100) / 100;
        customer.uniqueProducts = [...customer.uniqueProducts];
    });
    return rawStats;
}
console.log(getCustomerStats(orders));
