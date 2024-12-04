import "./cart.css";
import CartItem from "../../components/CartItem";
import { api } from "../../utils/api";

export async function render(callback) {
  const product = await api.product(1);
  return `
  <div class="container cart-container">
    <section class="cart-list">
      <div>
        <h2>Cart</h2>
      </div>
      <div>
        <ul>
          ${CartItem(product)}
          ${CartItem(product)}
        </ul>
      </div>
    </section>
    <section class="cart-checkout">
      <div>
        <h2>Total</h2>
        <ul>
          <li>
            <p>Subtotal</p>
            <p>$100</p>
          </li>
        </ul>
        <button>Checkout</button>
      </div>
    </section>
  </div>
  `;
}
