import HeartIconOutline from "/src/assets/icons/heart-outline.svg";

export default function CartItem(product) {
  return `
  <li>
      <img src="${product.image}" alt="${product.title}">
      <div>
        <div class="cart-item-top-row">
          <p>$${product.price}</p>
          <button>X</button>
        </div>
        <p class="cart-item-title">${product.title}</p>
        <div class="cart-item-bottom-row">
          <div class="cart-item-quantity">
            <button>-</button>
            <p>${product.quantity}</p>
            <button>+</button>
          </div>
          <button class="cart-item-save-btn">
            <img src="${HeartIconOutline}" alt="Heart">
            Save for later
          </button>
        </div>
      </div>
  </li>
  `;
}
