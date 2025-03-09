import {card, addToCart, upDateCartQuantity} from '../data/card.js';
import { products } from '../data/products.js';
import { formatMoney } from './utils/money.js';

let productsHTML = '';

products.forEach((event) => {
    productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${event.getImage()}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${event.getName()}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${event.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${event.getRating()}
            </div>
          </div>

          <div class="product-price">
            ${event.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${event.getId()}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${event.getId()}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" 
          data-product-id="${event.getId()}">
            Add to Cart
          </button>
        </div>
    `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        
        addToCart(productId);
        upDateCartQuantity();
        addedToCartMassage(productId);

        console.log(card)
    })
})

function addedToCartMassage(productId){
  const element = document.querySelector(`.js-added-to-cart-${productId}`);
  element.style.transition = "opacity 0.5s ease-in-out";
  element.style.opacity = "1";

  setTimeout(() => {
    element.style.opacity = "0";
  }, 500);
}