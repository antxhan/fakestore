import "./index.css";
import { toCapitalize } from "../../utils/utils";
import LikeButton from "../LikeButton";

export default function ProductListItem({ product }) {
  return `
  <div class="product-card" href="/product?id=${product.id}">
    <img src="${product.image}" alt="${
    product.title
  } image" class="product-image">
    <div class="product-info">
        <div>
            <p class="category">${toCapitalize(product.category)}</p>
            ${LikeButton()}
        </div>
        <p class="name">${product.title}</p>
        <p class="price">$${product.price}</p>
    </div>
  </div>
  `;
}
