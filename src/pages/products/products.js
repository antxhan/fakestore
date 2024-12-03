import { api } from "../../utils/api";
import { db } from "../../utils/db";
import PriceFilter from "../../components/PriceFilter/PriceFilter";
import CategoriesFilter from "../../components/CategoriesFilter/CategoriesFilter";
import "./products.css";
import ProductListItem from "../../components/ProductListItem";
import heartFilledIcon from "../../assets/icons/heart-filled.svg";
import heartOutlineIcon from "../../assets/icons/heart-outline.svg";

const PRODUCTS_PER_PAGE = 20;

function createHTML(productList) {
  return `
    <main>
      <section class="product-grid">
      ${productList}
      </section>
    </main>
    ${PriceFilter()}
    ${CategoriesFilter()}
    `;
}

export function render(callback) {
  // create a skeleton HTML to show while products are loading
  const skeletonHTML = createHTML("Loading...");

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
    })
    .catch((error) => {
      console.error("Error fetching products:", error);

      // callback to update the DOM
      const html = createHTML("Failed to load products");
      if (callback) callback(html);
    });

  return skeletonHTML;
}
