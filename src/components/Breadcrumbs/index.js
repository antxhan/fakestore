import "./index.css";
import chevronRight from "/src/assets/icons/chevron-right.svg";

export default function index(page) {
  return `
  <div class="breadcrumbs container">
    <a href="/">Home</a>
    <img src="${chevronRight}" alt="Chevron Right" width="20" height="20">
    <p>${page}</p>
  </div>
  `;
}
