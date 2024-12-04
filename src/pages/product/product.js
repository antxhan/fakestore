import "./product.css";
export function render() {
  return `
    <div class="product-container">
        <div class="product-image">
            <img src="./pages/product/Images/coat.png" alt="Faux Leather Coat">
        </div>
        <div class="product-info">
            <div class="product-details">
                <div class="product-name">
                    <h3>Topshop Faux Leather Coat</h3>
                </div>
                <div class="product-price">
                    <p>Now 979.00 SEK</p>
                </div>
                <div class="product-description">
                    <p>Black coat in faux leather with matte finish. Oversized fit.</p>
                </div>
                <hr>
                <div class="product-selection">
                    <div class="size-selection">
                        <p class="selection-title">Size: <strong>M</strong></p>
                        <div class="size-options">
                            <button class="size-button">XS</button>
                            <button class="size-button">S</button>
                            <button class="size-button">M</button>
                            <button class="size-button">L</button>
                            <button class="size-button selected">XL</button>
                        </div>
                    </div>
                    <div class="quantity-selection">
                        <p class="selection-title">Qty</p>
                        <div class="quantity-controls">
                            <button class="qty-button" id="decrease">−</button>
                            <span class="qty-number">1</span>
                            <button class="qty-button" id="increase">+</button>
                        </div>
                    </div>
                </div>
                <div class="add-to-bag-container">
                    <button class="add-to-bag-button">Add to cart</button>
                    <div class="heart-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `;
}