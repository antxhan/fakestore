import "./index.css";
import { toCapitalize } from "../../utils/utils";
import LikeButton from "../LikeButton";
import { db } from "../../utils/db";

export default function ProductListItem({ product }) {
  const isLiked = db.getLikes().includes(product.id.toString());
  return `
  <a class="product-card" href="/fakestore/product?id=${product.id}">
    <div class="product-image-wrapper">
      <img src="${product.image}" alt="${
    product.title
  } image" class="product-image">
    </div>
    <div class="product-info">
        <div>
            <p class="category">${toCapitalize(product.category)}</p>
            ${LikeButton(isLiked)}
        </div>
        <p class="name">${product.title}</p>
        <p class="price">$${product.price}</p>
    </div>
  </a>
  `;
}
