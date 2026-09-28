// ## Bài 4: Phân loại khách hàng và gợi ý danh mục

// Viết hàm `getMarketingReport(orders)`

// Quy tắc phân loại khách hàng:

// - **VIP**: Khách hàng có `totalSpent` từ **1000$ trở lên**
// - **Potential**: Khách hàng có `totalSpent` **dưới 1000$**

// Quy tắc gợi ý danh mục:

// - Gợi ý danh mục có doanh thu cao nhất và chưa từng mua
// - Nếu họ đã từng mua sản phẩm trong danh mục cao nhất thì gợi ý danh mục doanh thu cao thứ 2 và chưa từng mua
// - Nếu họ mua sản phẩm tất cả các danh mục thì trả về null (Lưu ý là không phải mua tất cả sản phẩm)

// Output:

// {
//   CUST101: {
//     name: "An",
//     segment: "VIP",
//     recommendedCategory: "Apparel"
//   },
//   CUST102: {
//     name: "Bình",
//     segment: "Potential",
//     recommendedCategory: "Electronics"
//   },
//   CUST103: {
//     name: "Chi",
//     segment: "VIP",
//     recommendedCategory: "Apparel"
//   }
// }
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

const getMarketingReport = (orders) => {
    // Gom thông tin khách hàng
    const customers = orders.reduce((result, order) => {
        if (!result[order.customerId]) {
            result[order.customerId] = {
                name: order.customerName,
                totalSpent: 0,
                categories: [],
            };
        }
        if (order.status === "completed") {
            for (const item of order.items) {
                let total = item.price * item.quantity;
                if (item.coupon === "SUMMER10") {
                    total *= 0.9;
                }
                if (item.coupon === "VIP20") {
                    total *= 0.8;
                }
                result[order.customerId].totalSpent += total;
                result[order.customerId].categories.push(item.category);
            }
        }
        return result;
    }, {});
    console.log(customers);
    // Tính doanh thu của từng category
    const categoryRevenue = orders.reduce((result, order) => {
        for (const item of order.items) {
            if (!result[item.category]) {
                result[item.category] = 0;
            }
            let total = item.price * item.quantity;
            if (item.coupon === "SUMMER10") {
                total *= 0.9;
            }
            if (item.coupon === "VIP20") {
                total *= 0.8;
            }
            result[item.category] += total;
        }
        return result;
    }, {});
    // Tạo ra mảng sắp xếp doanh thu của category giảm dần
    const categories = Object.entries(categoryRevenue)
        .sort((a, b) => b[1] - a[1])
        .map((category) => category[0]);
    // Tạo report
    const report = {};

    for (const customerId in customers) {
        const customer = customers[customerId];
        let recommendedCategory = null;
        for (const category of categories) {
            if (!customer.categories.includes(category)) {
                recommendedCategory = category;
                break;
            }
        }
        report[customerId] = {
            name: customer.name,
            segment: customer.totalSpent >= 1000 ? "VIP" : "Potential",
            recommendedCategory,
        };
    }
    return report;
};
console.log(getMarketingReport(orders));
