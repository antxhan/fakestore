import "./CategoriesFilter.css";

export default function CategoriesFilter() {
  return `<div class="categories-filter">
            <p class="filter-title">Categories</p>
            <div class="filter-options">
              <button class="filter-btn" value="electronics">Electronics</button>
              <button class="filter-btn" value="jewelery">Jewelery</button>
              <button class="filter-btn" value="men's clothing">Men's Clothing</button>
              <button class="filter-btn" value="women's clothing">Women's Clothing</button>
            </div>
          </div>
  `;
}
