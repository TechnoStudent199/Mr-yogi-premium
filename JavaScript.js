// Function to add items to the cart
function addToCart(item, price) {
  // Create a new cart item
  const cartItem = { item, price };

  // Retrieve the existing cart from localStorage or create a new one if it doesn't exist
  const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

  // Add the new item to the cart
  existingCart.push(cartItem);

  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(existingCart));

  // Update the cart popup and cart count (if necessary)
  updateCartPopup();
  updateCartCount();
}
