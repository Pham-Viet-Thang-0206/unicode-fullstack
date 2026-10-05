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
    const DISCOUNT_RATES = { SUMMER10: 0.9, VIP20: 0.8 };
    const revenue = orders.reduce((result, order) => {
        if (order.status !== "completed") return result;
        const rate = DISCOUNT_RATES[order.coupon] || 1;
        for (const { category, price, quantity } of order.items) {
            result[category] ??= 0;
            const total = price * quantity * rate;
            result[category] =
                Math.floor((result[category] + total) * 100) / 100;
        }
        return result;
    }, {});

    // Lấy ra cái Max
    return Object.entries(revenue).reduce(
        (result, [category, revenue]) =>
            revenue > result.revenue ? { category, revenue } : result,
        {
            category: null,
            revenue: 0,
        },
    );
};

console.log(getTopCategory(orders));


