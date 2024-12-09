import "./home.css";
// import placeholderImage from "../../assets/img/placeholder.png";
import heroImage from "../../assets/img/hero.png";
import hanger1 from "../../assets/icons/hanger-1.svg";
import hanger2 from "../../assets/icons/hanger-2.svg";
import jewelery from "../../assets/icons/jewelery.svg";
import electronics from "../../assets/icons/electronics.svg";
import heartFilledIcon from "../../assets/icons/heart-filled.svg";
import heartOutlineIcon from "../../assets/icons/heart-outline.svg";

import ProductListItem from "../../components/ProductListItem";
import { db } from "../../utils/db";
import { createAPI } from "../../utils/api";
const api = createAPI();

function createHTML(productList) {
  return `
  <div class="home-container container">
    <section class="home-hero">
      <p class="home-hero-title">Fake it <br/> 'til you <br/> Make it</p>
      <div class="home-hero-description">
        <p class="home-hero-subtitle">Don't be yourself</p>
        <a href="/products">Shop Now</a>
      </div>
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

function handleLikeButtons() {
  const likeButtons = document.querySelectorAll(".like-btn");
  likeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      // add/remove from likes in db
      const productId =
        e.target.parentNode.parentNode.parentNode.parentNode.href.split(
          "id="
        )[1];
      db.setLikes(productId);

      // set class and icon
      button.classList.toggle("liked");
      button.innerHTML = `<img src="${
        button.classList.contains("liked")
          ? `${heartFilledIcon}`
          : `${heartOutlineIcon}`
      }" draggable="false" alt="Like">`;
    });
  });
}

function addEventListeners() {
  handleLikeButtons();
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

      addEventListeners();
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
