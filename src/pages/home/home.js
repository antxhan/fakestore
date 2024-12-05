import "./home.css";
import placeholderImage from "../../assets/img/placeholder.png";
import heroImage from "../../assets/img/hero.png";
import hanger1 from "../../assets/icons/hanger-1.svg";
import hanger2 from "../../assets/icons/hanger-2.svg";
import jewelery from "../../assets/icons/jewelery.svg";
import electronics from "../../assets/icons/electronics.svg";
import { api } from "../../utils/api";
import ProductListItem from "../../components/ProductListItem";

function createHTML(productList) {
  return `
  <div class="home-container container">
    <section class="home-hero">
      <img src="${heroImage}" alt="placeholder image">
    </section>
    <section class="home-categories">
      <h2>Shop by Category</h2>
      <div class="home-categories-grid">
        <a href="/products?category=men's clothing">
          <img src="${hanger1}" alt="Men's clothing">
          <p>Men's Clothing</p>
        </a>
        <a href="/products?category=women's clothing">
          <img src="${hanger2}" alt="Women's clothing">
          <p>Women's Clothing</p>
        </a>
        <a href="/products?category=jewelery">
          <img src="${jewelery}" alt="Jewelery">
          <p>Jewelery</p>
        </a>
        <a href="/products?category=electronics">
          <img src="${electronics}" alt="Electronics">
          <p>Electronics</p>
        </a>
      </div>
    </section>
    <section class="home-new-arrivals">
      <div>
        <h2>New Arrivals</h2>
        <a href="/products">View All</a>
      </div>
      <div class="home-product-grid">
        ${productList}
      </div>
    </section>
  </div>
  `;
}

function getProducts(callback) {
  // asynchronously getting products, then updating the DOM
  api
    .products(4)
    .then((products) => {
      const productList = products
        .map((product) => ProductListItem({ product }))
        .join("");

      // callback to update the DOM
      const html = createHTML(productList);
      if (callback) callback(html);

      // addEventListeners();
    })
    .catch((error) => {
      console.error("Error fetching products:", error);

      // callback to update the DOM
      const html = createHTML("Failed to load products");
      if (callback) callback(html);
    });
}

export function render(callback) {
  const skeletonHTML = createHTML();
  getProducts(callback);
  return skeletonHTML;
}
