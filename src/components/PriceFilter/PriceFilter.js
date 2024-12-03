import "./PriceFilter.css";

export default function PriceFilter() {
  return `
  <button id="toggleButton">Toggle Price Filter</button>
    <div class="dropdown">
      <div class="priceFilterContainer">
        <div class="price-input">
          <div class="field">
            <span>Min</span>
            <input type="number" class="input_min" value="2500" />
          </div>
          <div class="seperator">-</div>
          <div class="field">
            <span>Max</span>
            <input type="number" class="input_max" value="7500" />
          </div>
        </div>
        <div class="slider">
          <div class="progress"></div>
        </div>
        <div class="range-input">
          <input
            type="range"
            class="range-min"
            min="0"
            max="1000"
            value="2500"
          />
          <input
            type="range"
            class="range-max"
            min="0"
            max="1000"
            value="7500"
          />
        </div>
      </div>
    </div>  
  `;
}
