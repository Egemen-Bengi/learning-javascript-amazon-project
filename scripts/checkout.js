import { card } from "../data/card.js";
import { products } from "../data/products.js";
import { formatMoney } from "./utils/money.js";
import { formatDate } from "./utils/datetimeFormat.js";

let checkoutHTML = '';

card.forEach((product, index) => {
    let item = undefined;

    products.forEach((event) => {
        if(product.productId === event.id){
            item = event
        }
    })

    checkoutHTML += `
    <div class="cart-item-container">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${item.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${item.name}
            </div>
            <div class="product-price">
                $${formatMoney(item.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label js-quantity-label">${product.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-quantity" data-product-id="${item.id}">
                Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-quantity" data-product-id="${item.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            <div class="delivery-option">
                <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${index}">
                <div>
                <div class="delivery-option-date">
                    ${formatDate(10)}
                </div>
                <div class="delivery-option-price">
                    FREE Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${index}">
                <div>
                <div class="delivery-option-date">
                    ${formatDate(4)}
                </div>
                <div class="delivery-option-price">
                    $4.99 - Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${index}">
                <div>
                <div class="delivery-option-date">
                    ${formatDate(1)}
                </div>
                <div class="delivery-option-price">
                    $9.99 - Shipping
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    `
})

document.querySelector('.js-order-summary').innerHTML = checkoutHTML;

document.querySelectorAll('.js-update-quantity').forEach((span) => {
    span.addEventListener('click', () => {
        updateQuantity(span);
    })
})

document.querySelectorAll('.js-delete-quantity').forEach((span) => {
    span.addEventListener('click', () => {
        deleteQuantity(span);
    })
})

function deleteQuantity(span){
    const productId = span.dataset.productId;

    card.forEach((product) => {
        if(productId === product.productId){
            if(product.quantity === 1){
                console.log('sil');
            } else{
                product.quantity -= 1;
                document.querySelector('.js-quantity-label').innerText = product.quantity;
            }
        }
    })
}

function updateQuantity(span){
    const productId = span.dataset.productId;

    card.forEach((product) => {
        if(productId === product.productId){
            product.quantity += 1;
            document.querySelector('.js-quantity-label').innerText = product.quantity;
        }
    })
}