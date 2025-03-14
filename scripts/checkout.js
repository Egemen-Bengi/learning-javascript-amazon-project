import { card, deleteQuantity, updateDeliveryOption,updateProductQuantity } from "../data/card.js";
import { products,loadProducts } from "../data/products.js";
import { formatMoney } from "./utils/money.js";
import { formatDate } from "./utils/datetimeFormat.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import { paymentSummry } from "./paymentSummary.js";

loadProducts(() => {
    renderOrderSummry();
})
function renderOrderSummry(){
    let checkoutHTML = '';

    card.forEach((product) => {
        let item;

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
                src="${item.getImage()}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${item.getName()}
                </div>
                <div class="product-price">
                    ${item.getPrice()}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label js-quantity-label">${product.quantity}</span>
                    </span>
                    <input class="js-new-quantity-input new-quantity-input js-input-field" type="number" value="1" data-testid="new-quantity-input">
                    <span class="update-quantity-link link-primary js-update-quantity" data-product-id="${item.id}">
                    Update
                    </span>
                    <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${item.id}" data-testid="save-quantity-link">
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
                    ${deliveryOptionsHTML(item.getId(), product)}

                </div>
            </div>
        </div>
        `
    })

    document.querySelector('.js-order-summary').innerHTML = checkoutHTML;

    paymentSummry();

    document.querySelectorAll('.js-update-quantity').forEach((span) => {
        span.addEventListener('click', () => {
            updateQuantity(span);
        })
    })

    document.querySelectorAll('.js-delete-quantity').forEach((span) => {
        span.addEventListener('click', () => {
            deleteQuantity(span);
            paymentSummry();
        })
    })

    function updateQuantity(span){
        const productId = span.dataset.productId;

        document.querySelector('.js-update-quantity')
        
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
            renderOrderSummry();
        })
    })

    function productUpdateSaveDelete(){      
        const updateBtns = document.querySelectorAll('.js-update-quantity');
        const inputFields = document.querySelectorAll('.js-input-field');
        const saveBtns = document.querySelectorAll('.js-save-quantity-link');

        updateBtns.forEach((updateBtn, index) =>{
            const saveBtn = saveBtns[index];
            const inputField = inputFields[index];

            saveBtn.style.display = 'none';
            inputField.style.display = 'none';
            
            updateBtn.addEventListener('click', () =>{
                updateBtn.style.display = 'none';
                saveBtn.style.display = 'inline';
                inputField.style.display = 'inline';
            })

            saveBtn.addEventListener('click', () => {
                saveBtn.style.display = 'none';
                inputField.style.display = 'none';
                updateBtn.style.display = 'inline';
                
                const element = document.querySelector('.js-save-quantity-link');
                const productId = element.getAttribute('data-product-id');
                const inputQuantity = Number(inputField.value); 

                updateProductQuantity(productId, inputQuantity);
                renderOrderSummry();
            })
        })
    }
   productUpdateSaveDelete();
}