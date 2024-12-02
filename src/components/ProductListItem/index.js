import "./index.css";

export default function ProductListItem({ product }) {
  return `
  <div class="product-card">
    <img src="${product.image}" alt="${product.title} image" class="product-image">
    <div class="product-info">
        <div class="left-info">
            <p class="brand">${product.category}</p>
            <p class="name">${product.title}</p>
            <p class="price">${product.price}</p>
        </div>
        <div class="right-info">
            <button class="like-btn"><span>&#x2764;</span></button>
            <p><br></p>
            <p class="stock">12 items left!</p>
        </div>
    </div>
  </div>
  `;
}
