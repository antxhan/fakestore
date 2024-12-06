import { db } from "../../utils/db";
import { api } from "../../utils/api";
import "./cart.css";
import CartItem from "../../components/CartItem";
import Breadcrumbs from "../../components/Breadcrumbs";
import { sumTotal } from "../../utils/utils";

function createHTML(cartItems, total) {
  return `
  ${Breadcrumbs("Cart")}
  <div class="container cart-container">
    <section class="cart-list">
      <div>
        <h2>Cart</h2>
      </div>
      <div>
        <ul>
        ${cartItems}
        </ul>
      </div>
    </section>
    <section class="cart-checkout">
      <div>
        <h2>Total</h2>
        <ul>
          <li>
            <p>Subtotal</p>
            <p>${total}</p>
          </li>
        </ul>
        <button ${total === "N/A" ? "disabled" : ""}>Checkout</button>
      </div>
    </section>
  </div>
  `;
}

export async function render(callback) {
  // create a skeleton HTML to show while products are loading
  const skeletonHTML = createHTML("Loading...", "Loading...");

  // db.setCart({
  //   1: 3,
  // });
  const cart = db.getCart();

  // if no items in cart, show a message
  if (Object.entries(cart).length === 0) {
    const html = createHTML("No items in cart", "N/A");
    if (callback) callback(html);
    return html;
  }

  // get all products from api
  let products = Object.entries(cart).map(async ([id, quantity]) => {
    const product = await api.product(id);
    product.quantity = quantity;
    return product;
  });
  products = await Promise.all(products);
  const total = sumTotal(products);

  // asynchronously getting products, then updating the DOM
  let productList = "";
  const productIds = Object.keys(cart);
  productIds.forEach((productId) => {
    api
      .product(productId)
      .then((product) => {
        product.quantity = cart[productId];
        productList = productList + CartItem(product);

        // callback to update the DOM
        const html = createHTML(productList, `$${total.toFixed(2)}`);
        if (callback) callback(html);

        // add event listener to quanitity buttons
        const quanitityButtons = document.querySelectorAll(
          ".cart-item-quantity button"
        );
        quanitityButtons.forEach((button) => {
          button.addEventListener("click", (e) => {
            e.preventDefault();

            const productId =
              button.parentNode.parentNode.parentNode.parentNode.href.split(
                "id="
              )[1];

            const currentCart = db.getCart();
            if (e.currentTarget.value === "-") {
              // decrement quantity
              currentCart[productId] = currentCart[productId] - 1;
              // if quantity is 0, remove from cart
              if (currentCart[productId] === 0) {
                delete currentCart[productId];
                button.parentNode.remove();
              }
            } else {
              // increment quantity
              currentCart[productId] = currentCart[productId] + 1;
            }
            db.setCart(currentCart);
            // change quantity in view
            button.parentNode.querySelector("p").innerHTML =
              currentCart[productId];

            // re-render to change total
            return render(callback);
          });
        });

        const deleteButtons = document.querySelectorAll(
          ".cart-item-delete-btn"
        );
        deleteButtons.forEach((button) => {
          button.addEventListener("click", (e) => {
            e.preventDefault();
            const productId =
              e.target.parentNode.parentNode.parentNode.parentNode.href.split(
                "id="
              )[1];
            const currentCart = db.getCart();
            delete currentCart[productId];
            db.setCart(currentCart);
            return render(callback);
          });
        });
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  });

  return skeletonHTML;
}
