const products = [
    {
        id: 1,
        name: "T-Shirt",
        price: 20,
        quantity: 1
    },
    {
        id: 2,
        name: "Jacket",
        price: 60,
        quantity: 1
    },
    {
        id: 3,
        name: "Jeans pant",
        price: 35,
        quantity: 1
    }
];

const orderItems = document.getElementById("orderItems");
const totalItemsElement = document.getElementById("totalItems");
const subtotalElement = document.getElementById("subtotal");
const finalSubtotalElement = document.getElementById("finalSubtotal");

let subtotal = 0;
let totalItems = 0;

products.forEach(function(product) {
    orderItems.innerHTML += `
        <p>${product.name} - $${product.price}</p>
    `;

    totalItems += product.quantity;
    subtotal += product.price * product.quantity;
});

totalItemsElement.textContent = totalItems;
subtotalElement.textContent = subtotal.toFixed(2);
finalSubtotalElement.textContent = subtotal.toFixed(2);


const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
const deliveryFeeElement = document.getElementById("deliveryFee");
const finalTotalElement = document.getElementById("finalTotal");

let deliveryFee = 5;
let discount = 0;

function calculateTotal() {
    let finalTotal = subtotal + deliveryFee - discount;
    finalTotalElement.textContent = finalTotal.toFixed(2);
}

function updateDelivery() {
    if (subtotal >= 100) {
        deliveryFee = 0;
    } else {
        const selectedOption = document.querySelector('input[name="delivery"]:checked');
        deliveryFee = Number(selectedOption.value);
    }

    deliveryFeeElement.textContent = deliveryFee.toFixed(2);
    calculateTotal();
}

deliveryOptions.forEach(function(option) {
    option.addEventListener("change", updateDelivery);
});

updateDelivery();


const paymentOptions = document.querySelectorAll('input[name="payment"]');
const paymentMessage = document.getElementById("paymentMessage");

paymentOptions.forEach(function(option) {
    option.addEventListener("change", function() {
        paymentMessage.textContent = "You selected " + option.value;
    });
});


const promoCode = document.getElementById("promoCode");
const applyPromo = document.getElementById("applyPromo");
const promoMessage = document.getElementById("promoMessage");
const discountElement = document.getElementById("discount");

applyPromo.addEventListener("click", function() {

    if (promoCode.value === "SAVE10") {
        discount = subtotal * 0.10;
        promoMessage.textContent = "10% discount applied!";

    } else if (promoCode.value === "SAVE20") {
        discount = subtotal * 0.20;
        promoMessage.textContent = "20% discount applied!";

    } else if (promoCode.value === "SAVE5") {
        discount = subtotal * 0.05;
        promoMessage.textContent = "5% discount applied!";

    } else {
        discount = 0;
        promoMessage.textContent = "Invalid promo code!";
    }

    discountElement.textContent = discount.toFixed(2);
    calculateTotal();
});


const customerName = document.getElementById("customerName");
const customerEmail = document.getElementById("customerEmail");
const customerPhone = document.getElementById("customerPhone");
const customerAddress = document.getElementById("customerAddress");

const placeOrder = document.getElementById("placeOrder");
const orderConfirmation = document.getElementById("orderConfirmation");

placeOrder.addEventListener("click", function() {

    if (
        customerName.value.trim() === "" ||
        customerEmail.value.trim() === "" ||
        customerPhone.value.trim() === "" ||
        customerAddress.value.trim() === ""
    ) {
        orderConfirmation.textContent = "Please fill in all customer information.";
        return;
    }

    const orderNumber = Math.floor(Math.random() * 100000);

    let orderDetails = "";

    products.forEach(function(product) {
        orderDetails += `
            <p>
                ${product.name} -
                Quantity: ${product.quantity} -
                $${product.price}
            </p>
        `;
    });

    const selectedDelivery = document.querySelector('input[name="delivery"]:checked');
    const selectedPayment = document.querySelector('input[name="payment"]:checked');

    orderConfirmation.innerHTML = `
        <h2>Order Confirmed!</h2>

        <p>Order Number: ${orderNumber}</p>

        <h3>Customer Information</h3>
        <p>Name: ${customerName.value}</p>
        <p>Email: ${customerEmail.value}</p>
        <p>Phone: ${customerPhone.value}</p>
        <p>Address: ${customerAddress.value}</p>

        <h3>Products Ordered</h3>
        ${orderDetails}

        <h3>Order Details</h3>
        <p>Delivery: ${selectedDelivery.value === "5" ? "Standard" : "Express"}</p>
        <p>Payment: ${selectedPayment.value}</p>

        <h3>Price Breakdown</h3>
        <p>Subtotal: $${subtotal.toFixed(2)}</p>
        <p>Discount: $${discount.toFixed(2)}</p>
        <p>Delivery Fee: $${deliveryFee.toFixed(2)}</p>

        <h2>Final Total: $${finalTotalElement.textContent}</h2>
    `;
});


calculateTotal();