import "./cart.css";
import CartItem from "../../components/CartItem";
import { api } from "../../utils/api";

function sumTotal(cartItems) {
  return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

function createHTML(cartItems) {
  const html = `
  <div class="container cart-container">
    <section class="cart-list">
      <div>
        <h2>Cart</h2>
      </div>
      <div>
        <ul>
        ${
          cartItems.length === 0
            ? "No items in cart"
            : cartItems.map(CartItem).join("")
        }
        </ul>
      </div>
    </section>
    <section class="cart-checkout">
      <div>
        <h2>Total</h2>
        <ul>
          <li>
            <p>Subtotal</p>
            <p>${
              cartItems.length === 0
                ? "N/A"
                : `$${sumTotal(cartItems).toFixed(2)}`
            }</p>
          </li>
        </ul>
        <button>Checkout</button>
      </div>
    </section>
  </div>
  `;
  return html;
}

export async function render(callback) {
  // example of cart item, key: id, value: quantity
  const cartItems = {
    1: 3,
    2: 2,
  };

  // get all products from api
  let products = Object.entries(cartItems).map(async ([id, quantity]) => {
    const product = await api.product(id);
    product.quantity = quantity;
    return product;
  });
  products = await Promise.all(products);

  const skeletonHTML = createHTML(products);
  if (callback) callback(skeletonHTML);
  return skeletonHTML;
}
