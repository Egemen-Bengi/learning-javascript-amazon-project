import { card, deleteQuantity,getTotalQuantity,getTotalMoney, updateDeliveryOption } from "../data/card.js";
import { products } from "../data/products.js";
import { formatMoney } from "./utils/money.js";
import { formatDate } from "./utils/datetimeFormat.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

let checkoutHTML = '';

card.forEach((product) => {
    let item = undefined;

    products.forEach((event) => {
        if(product.productId === event.id){
            item = event
        }
    })

    let deliveryOption = undefined;
    deliveryOptions.forEach((option) => {
        if(product.deliveryOptionsId === option.id){
            deliveryOption = option
        }
    })

    checkoutHTML += `
    <div class="cart-item-container js-cart-item-container-${item.id}">
        <div class="delivery-date">
            Delivery date: ${formatDate(deliveryOption.deliveryDays)}
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
                <input class="js-new-quantity-input new-quantity-input" type="number" value="1" data-testid="new-quantity-input">
                <span class="update-quantity-link link-primary js-update-quantity" data-product-id="${item.id}">
                Update
                </span>
                <span class="js-save-quantity-link save-quantity-link link-primary" data-testid="save-quantity-link">
                  Save
                </span>
                <span class="delete-quantity-link link-primary js-delete-quantity" data-product-id="${item.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options ">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(item.id, product)}

            </div>
        </div>
    </div>
    `
})

document.querySelector('.js-order-summary').innerHTML = checkoutHTML;
items();

document.querySelectorAll('.js-update-quantity').forEach((span) => {
    span.addEventListener('click', () => {
        updateQuantity(span);
    })
})

document.querySelectorAll('.js-delete-quantity').forEach((span) => {
    span.addEventListener('click', () => {
        deleteQuantity(span);
        items();
    })
})

function updateQuantity(span){
    const productId = span.dataset.productId;

    document.querySelector('.js-update-quantity')
    
}

function items(){
    document.querySelector('.js-payment-row-head').innerHTML = `
        <div>Items (${getTotalQuantity()}):</div>
        <div class="payment-summary-money">$${formatMoney(getTotalMoney())}</div>
    `
}

function deliveryOptionsHTML(productId, cartItem){
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
        const deliveryDateStr = formatDate(deliveryOption.deliveryDays);
        const deliveryPriceStr = deliveryOption.priceCents === 0 ? "FREE"
        :`$${formatMoney(deliveryOption.priceCents)}`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;

        html += 
        `
            <div class="delivery-option js-delivery-options"
            data-product-id="${productId}" 
            data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" ${isChecked ? 'checked': ''}
                class="delivery-option-input"
                name="delivery-option-${productId}">
                <div>
                    <div class="delivery-option-date">
                        ${deliveryDateStr}
                    </div>
                    <div class="delivery-option-price">
                        ${deliveryPriceStr} - Shipping
                    </div>
                </div>
            </div>
        `
    })
    return html;
}

document.querySelectorAll(".js-delivery-options").forEach((element) => {
    element.addEventListener('click', () => {
        const productId = element.dataset.productId;
        const deliveryOptionId = element.dataset.deliveryOptionId;
        updateDeliveryOption(productId, deliveryOptionId)
    })
})