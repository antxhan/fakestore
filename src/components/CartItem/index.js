// import HeartIconOutline from "/src/assets/icons/heart-outline.svg";
import plusIcon from "/src/assets/icons/plus.svg";
import minusIcon from "/src/assets/icons/minus.svg";
import xIcon from "/src/assets/icons/x.svg";

export default function CartItem(product) {
  return `
  <a href="/product?id=${product.id}">
      <img src="${product.image}" alt="${product.title}">
      <div>
        <div class="cart-item-top-row">
          <p>$${product.price}</p>
          <button class="cart-item-delete-btn">
            <img src="${xIcon}" alt="Delete">
          </button>
        </div>
        <p class="cart-item-title">${product.title}</p>
        <div class="cart-item-bottom-row">
          <div class="cart-item-quantity">
            <button value="-">
              <img src="${minusIcon}" alt="Decrement">
            </button>
            <p>${product.quantity}</p>
            <button value="+">
              <img src="${plusIcon}" alt="Increment">
            </button>
          </div>
        </div>
      </div>
  </a>
  `;
}

// Save for later button
// `<button class="cart-item-save-btn">
//   <img src="${HeartIconOutline}" alt="Heart">
//   Save for later
// </button>`
