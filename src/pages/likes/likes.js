import { db } from "../../utils/db";
import { api } from "../../utils/api";
import "./likes.css";
import ProductListItem from "../../components/ProductListItem";
import Breadcrumbs from "../../components/Breadcrumbs";

function createHTML(productList) {
  return `
  ${Breadcrumbs("Likes")}
    <main class="container">
        <section class="product-grid">
        ${productList}
        </section>
    </main>
`;
}

export function render(callback) {
  // create a skeleton HTML to show while products are loading
  const skeletonHTML = createHTML("Loading...");

  const productIds = db.getLikes();

  //   if no likes, show a message
  if (productIds.length === 0) {
    const html = createHTML("No likes");
    if (callback) callback(html);
    return html;
  }

  // asynchronously getting products, then updating the DOM
  let productList = "";
  productIds.forEach((productId) => {
    api
      .product(productId)
      .then((product) => {
        productList = productList + ProductListItem({ product });

        // callback to update the DOM
        const html = createHTML(productList);
        if (callback) callback(html);

        // add event listener to like buttons
        const likeButtons = document.querySelectorAll(".like-btn");
        likeButtons.forEach((button) => {
          button.addEventListener("click", (e) => {
            e.preventDefault();

            // remove from likes in db
            const productId =
              e.target.parentNode.parentNode.parentNode.parentNode.href.split(
                "id="
              )[1];
            db.setLikes(productId);

            // re-render
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
