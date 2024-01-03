const calculateItemPrice = (orderedItems) => {
    return orderedItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Helper function to calculate total price
const calculateTotalPrice = (itemPrice, shippingPrice, taxPrice) => {
    return itemPrice + shippingPrice + taxPrice;
};




module.exports={
    calculateItemPrice,calculateTotalPrice
}
