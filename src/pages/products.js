import { api } from "../utils/api";

export async function render() {
  const products = await api.products(3);
  const product = await api.product(3);
  console.log(products);
  console.log("product", product);
  return `
        <h1>Products</h1>
        <ul>
        ${products
          .map((product) => `<li>${product.title}</li>`)
          .join("")}           
        </ul>`;
}
