import {card} from '../data/card.js';
import { products } from '../data/products.js';

let productsHTML = '';

products.forEach((event) => {
    productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${event.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${event.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${event.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${event.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(event.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${event.id}">
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

          <div class="added-to-cart js-added-to-cart-${event.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" 
          data-product-id="${event.id}">
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
    })
})

function upDateCartQuantity(){
  let totalQuantity = 0;
  card.forEach((item) => {
    totalQuantity += item.quantity;
  })
  document.querySelector('.js-cart-quantity').innerHTML = totalQuantity;
}

function addToCart(productId){
  let ifMatchItem = false;
  card.forEach((product) => {
      if(productId === product.productId) {
          product.quantity += selectOption(productId);
          ifMatchItem = true;
      }
  })
  if(!ifMatchItem){
      card.push({
          productId: productId,
          quantity: selectOption(productId)
      })
  }
}

function selectOption(productId){
  let selectElement = document.querySelector(`.js-quantity-selector-${productId}`);
  let selectedOption = selectElement.options[selectElement.selectedIndex];
  return Number(selectedOption.value);
}

function addedToCartMassage(productId){
  const element = document.querySelector(`.js-added-to-cart-${productId}`);
  element.style.transition = "opacity 0.5s ease-in-out";
  element.style.opacity = "1";

  setTimeout(() => {
    element.style.opacity = "0";
  }, 500);
}