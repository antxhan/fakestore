import { api } from "../../utils/api";
import { db } from "../../utils/db";
import PriceFilter from "../../components/PriceFilter/PriceFilter";
import CategoriesFilter from "../../components/CategoriesFilter/CategoriesFilter";
import "./products.css";
import ProductListItem from "../../components/ProductListItem";
import heartFilledIcon from "../../assets/icons/heart-filled.svg";
import heartOutlineIcon from "../../assets/icons/heart-outline.svg";
import Breadcrumbs from "../../components/Breadcrumbs";

const PRODUCTS_PER_PAGE = 20;

function createHTML(productList) {
  return `
  ${Breadcrumbs("Products")}
    <main class="products-container container">
      <aside class="product-filters-wrapper">
      <h2>Filter</h2>
      <div class="product-filters">
        ${PriceFilter()}
        ${CategoriesFilter()}
      </div>
      </aside>
      <section class="product-grid">
      ${productList}
      </section>
    </main>

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

function handlePriceFilter() {
  const toggleButton = document.querySelector("#toggleButton");
  const wrapper = document.querySelector(".wrapper");

  if (toggleButton && wrapper) {
    toggleButton.innerHTML = `Price <span id="arrow">▼</span>`;
    const arrow = document.querySelector("#arrow");

    toggleButton.addEventListener("click", () => {
      const isHidden = wrapper.style.display === "none";
      wrapper.style.display = isHidden ? "block" : "none";

      arrow.style.transform = isHidden ? "rotate(180deg)" : "rotate(0deg)";
    });
  }

  const rangeInput = document.querySelectorAll(".range-input input"),
    priceInput = document.querySelectorAll(".price-input input"),
    range = document.querySelector(".slider .progress");
  let priceGap = 1000;
  priceInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minPrice = parseInt(priceInput[0].value),
        maxPrice = parseInt(priceInput[1].value);

      if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
        if (e.target.className === "input-min") {
          rangeInput[0].value = minPrice;
          range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
        } else {
          rangeInput[1].value = maxPrice;
          range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
        }
      }
    });
  });
  rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);
      if (maxVal - minVal < priceGap) {
        if (e.target.className === "range-min") {
          rangeInput[0].value = maxVal - priceGap;
        } else {
          rangeInput[1].value = minVal + priceGap;
        }
      } else {
        priceInput[0].value = minVal;
        priceInput[1].value = maxVal;
        range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
        range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
      }
    });
  });
}

function handleCategoriesFilter() {
  // Step 1: Attach an event listener to detect when a user clicks on a category.
  // This ensures the function runs every time a category is selected.
  // ---------
  // Step 2: When a category is clicked, retrieve its value (e.g., "men's clothing")
  // ---------
  // Step 3: Update the browser to navigate to the appropriate URL for the selected category.
  // Construct the URL with the format: /products?category=<categoryValue>.
  // Example: Clicking "Men's Clothing" should take the user to /products?category=men's clothing.
}

function highlightSelectedCategory(category) {
  // Step 1: Find the category button that matches the provided category parameter.
  // Try a selector search for the button with a value that equals the category parameter.
  // ---------
  // Step 2: Add the `.selected` class to the button to visually highlight it.
}

function addEventListeners() {
  handleLikeButtons();
  handlePriceFilter();
  handleCategoriesFilter();
}

function getProducts(callback) {
  // asynchronously getting products, then updating the DOM
  api
    .products(PRODUCTS_PER_PAGE)
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

function getCategory(callback, category) {
  // asynchronously getting products, then updating the DOM
  api
    .category(category)
    .then((products) => {
      const productList = products
        .map((product) => ProductListItem({ product }))
        .join("");

      // callback to update the DOM
      const html = createHTML(productList);
      if (callback) callback(html);

      addEventListeners();
      highlightSelectedCategory(category);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);

      // callback to update the DOM
      const html = createHTML("Failed to load products");
      if (callback) callback(html);
    });
}

export function render(callback) {
  // create a skeleton HTML to show while products are loading
  const skeletonHTML = createHTML("Loading...");

  // check if any filters
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  const category = searchParams.get("category");
  if (category) {
    getCategory(callback, category);
  } else {
    getProducts(callback);
  }
  return skeletonHTML;
}
