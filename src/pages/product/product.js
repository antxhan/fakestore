import "./product.css";
import { api } from "../../utils/api";
import { db } from "../../utils/db";
import heartOutline from "../../assets/icons/heart-outline.svg";
import heartFilled from "../../assets/icons/heart-filled.svg";
import Breadcrumbs from "../../components/Breadcrumbs";

function createHTML(product) {
  // console.log(product.title);
  const loadingMessage = "Loading...";
  return `
  ${Breadcrumbs(product.title || loadingMessage)}
  <div class="product-container container">
      <div class="product-image">
         <img src="${product.image || loadingMessage}" alt="${
    product.title || loadingMessage
  }">
      </div>
      <div class="product-info">
          <div class="product-details">
              <div class="product-name">
                  <h3>${product.title || loadingMessage}</h3>
              </div>
              <div class="product-price">
                  <p>$${product.price || loadingMessage}</p>
              </div>
              <div class="product-description">
                  <p>${product.description || loadingMessage}</p>
              </div>
              <hr>
              <div class="product-selection">
                  ${
                    product.category === "men's clothing" ||
                    product.category === "women's clothing"
                      ? `<div class="size-selection">
                      <p class="selection-title">Size: <strong>M</strong></p>
                      <div class="size-options">
                          <button class="size-button">XS</button>
                          <button class="size-button">S</button>
                          <button class="size-button">M</button>
                          <button class="size-button">L</button>
                          <button class="size-button selected">XL</button>
                      </div>
                  </div>`
                      : ""
                  }
                  <div class="quantity-selection">
                      <p class="selection-title">Qty</p>
                      <div class="quantity-controls">
                          <button class="qty-button" id="decrease" value="-">−</button>
                          <span class="qty-number">1</span>
                          <button class="qty-button" id="increase" value="+">+</button>
                      </div>
                  </div>
              </div>
              <div class="add-to-bag-container">
                  <button class="add-to-bag-button">Add to cart</button>
                  <div class="heart-icon">
                      <img src="${
                        product.liked ? heartFilled : heartOutline
                      }" alt="${
    product.liked ? "Unlike" : "Like"
  }" class="heart-icon">
                  </div>
              </div>
          </div>
      </div>
  </div>
`;
}

function handleQuantityButtons() {
  const quanitityButtons = document.querySelectorAll(
    ".quantity-controls button"
  );
  quanitityButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const quantityContainer = button.parentNode.querySelector("span");
      const quantity = parseInt(quantityContainer.innerHTML);
      if (e.currentTarget.value === "-") {
        if (quantity === 1) return;
        quantityContainer.innerHTML = quantity - 1;
      } else {
        quantityContainer.innerHTML = quantity + 1;
      }
    });
  });
}

function handleAddToCart(productId) {
    const currentCart = db.getCart() || {}; 

    if (currentCart[productId]) {
      currentCart[productId] += 1;
    } else {
      currentCart[productId] = 1;
    }
  
    db.setCart(currentCart); 
  }  

  function handleLike(productId) {
    const likeButton = document.querySelector('.heart-icon');
    
    likeButton.addEventListener('click', (e) => {
      e.preventDefault();
      
     
      likeButton.classList.toggle('liked');
      
      const heartImg = likeButton.querySelector('img');
      if (likeButton.classList.contains('liked')) {
        heartImg.src = heartFilled;
      } else {
        heartImg.src = heartOutline;
      }
      
      db.setLikes(productId);
    });
  }


export async function render(callback) {
  // create a skeleton HTML to show while product is loading
  const skeletonHTML = createHTML("Loading...");

  // getting product id from url
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  const productId = searchParams.get("id");

  // asynchronously getting product, then updating the DOM
  api
    .product(productId)
    .then((product) => {
      // checks if has been liked
      const likedProducts = db.getLikes();
      if (likedProducts.includes(productId)) {
        product.liked = true;
      }

      // callback to update the DOM
      const html = createHTML(product);
      if (callback) callback(html);

      // add event Listeners
      handleQuantityButtons();
      handleAddToCart(productId);
      handleLike(productId);
    })
    .catch((error) => {
      console.error("Error fetching product:", error);
    });

  return skeletonHTML;
}
