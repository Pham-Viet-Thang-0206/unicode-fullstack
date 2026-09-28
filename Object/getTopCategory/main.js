// Viết hàm `getTopCategory(orders)`

// Output:

// { category: "Electronics", revenue: 2085 }

// 2 bước làm

// tính tổng revenue của từng category
// lấy ra cái lớn nhất

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

const getTopCategory = (orders) => {
    // Lấy ra tổng revenue của từng category
    const revenueByCategory = orders.reduce((result, order) => {
        if (order.status === "completed") {
            for (let item of order.items) {
                if (!result[item.category]) {
                    result[item.category] = 0;
                }
                if (order.coupon === "SUMMER10") {
                    result[item.category] += item.quantity * item.price * 0.9;
                } else if (order.coupon === "VIP20") {
                    result[item.category] += item.quantity * item.price * 0.8;
                } else {
                    result[item.category] += item.quantity * item.price;
                }
            }
        }
        return result;
    }, {});

    // Lấy ra cái max
    const result = Object.entries(revenueByCategory).reduce(
        (result, current) => {
            if (current[1] > result.revenue) {
                result.category = current[0];
                result.revenue = current[1];
            }
            return result;
        },
        { category: null, revenue: 0 },
    );
    return result;
};

console.log(getTopCategory(orders));
