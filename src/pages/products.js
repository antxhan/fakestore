import { api } from "../utils/api";

const PRODUCTS_PER_PAGE = 20;

function createHTML(productList) {
  return `
    <h1>Products</h1>
    <ul>${productList}</ul>
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
        .map((product) => `<li>${product.title}</li>`)
        .join("");

      // callback to update the DOM
      const html = createHTML(productList);
      if (callback) callback(html);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);

      // callback to update the DOM
      const html = createHTML("Failed to load products");
      if (callback) callback(html);
    });

  return skeletonHTML;
}
