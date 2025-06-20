// Function to add items to the cart
function addToCart(item, price) {
  // Create a new cart item
  const cartItem = { item, price };

  // Retrieve the existing cart from localStorage or create a new one
  const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

  // Add the new item to the cart
  existingCart.push(cartItem);

  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(existingCart));

  // Update the cart popup and cart count (if necessary)
  updateCartPopup();
  updateCartCount();
}

// Function to update the cart popup
function updateCartPopup() {
  const cartPopup = document.getElementById('cart-popup');
  const cartItemsList = document.getElementById('cart-items');
  cartItemsList.innerHTML = ''; // Clear previous items

  let total = 0;
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.item} - ₹${item.price}`;
    cartItemsList.appendChild(li);

    total += item.price;
  });

  // Update the total price in the cart
  const totalElement = document.getElementById('cart-total');
  totalElement.textContent = `Total: ₹${total}`;
}

// Function to update the cart count in the top-right cart button
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartCount.textContent = cart.length;
}

// Function to handle checkout
function handleCheckout() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (cart.length > 0) {
    alert('Proceeding to payment...');
    // Here, you could integrate a payment gateway (e.g., UPI, Stripe, etc.)
  } else {
    alert('Your cart is empty!');
  }
}

// Function to update the checkout page with cart data
function updateCheckoutPage() {
  const cartItemsList = document.getElementById('cart-items-list');
  const totalAmount = document.getElementById('total-amount');
  
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let total = 0;
  
  cart.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="item-details">
        <span class="item-name">${item.item}</span>
        <span class="price">₹${item.price}</span>
      </div>
    `;
    cartItemsList.appendChild(li);

    total += item.price;
  });

  // Update the total amount in the checkout page
  totalAmount.textContent = total;

  // Update UPI link with the correct total amount
  const upiLink = document.getElementById('upi-link');
  upiLink.href = `upi://pay?pa=mryogipremium@ybl&pn=MR.YOGI PREMIUM SUBSCRIPTION'S&am=${total}`;
}

// Initialize the cart page and checkout page
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('cart-count')) {
    updateCartCount(); // Update the cart count on the top-right button
  }

  if (document.getElementById('checkout-button')) {
    document.getElementById('checkout-button').addEventListener('click', handleCheckout);
  }

  if (document.getElementById('cart-items-list')) {
    updateCheckoutPage(); // Update the checkout page with cart items and total
  }
});
