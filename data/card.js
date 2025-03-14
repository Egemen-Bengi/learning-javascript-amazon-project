import { products } from "./products.js";
import { paymentSummry } from "../scripts/paymentSummary.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import { formatMoney } from "../scripts/utils/money.js";

export let card = JSON.parse(localStorage.getItem('cart'));

if(!card){
    card = [];
}

export function deleteProduct(productId){
    const newCart = [];

    card.forEach((item) => {
        if(productId !== item.productId){
            newCart.push(item);
        }
    })
    card = newCart;

    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(card));
}

export function addToCart(productId){
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
            quantity: selectOption(productId),
            deliveryOptionsId: '1'
        })
    }
    saveToStorage();
}

function selectOption(productId){
    let selectElement = document.querySelector(`.js-quantity-selector-${productId}`);
    let selectedOption = selectElement.options[selectElement.selectedIndex];
    return Number(selectedOption.value);
}

export function upDateCartQuantity(){
    let totalQuantity = 0;
    card.forEach((item) => {
        totalQuantity += item.quantity;
    })
    document.querySelector('.js-cart-quantity').innerHTML = totalQuantity;
}

export function updateProductQuantity(productId, inputQuantity){
    card.forEach((item) => {
        if(productId === item.productId){
            item.quantity = Number(inputQuantity);
        }
    })
    saveToStorage();
}

/*
export function getProduct(productId){
    let product;
    card.forEach((item) => {
        if(productId === item.productId){
            product = item
        }
    })
    return product;
}
*/

export function getTotalQuantity(){
    let totalQuantity = 0;
    card.forEach((item) => {
        totalQuantity += Number(item.quantity);
        console.log(typeof totalQuantity);
    })
    return totalQuantity;
}

export function getTotalMoney(){
    let totalMoney = 0;
    card.forEach((item) => {
        products.forEach((product) => {
            if(item.productId === product.id){
                totalMoney += (product.priceCents) * item.quantity;
            }
        })
    })
    return totalMoney;
}

export function getShippingMoney(){
    let shippingMoney = 0;
    card.forEach((cartItem) => {
        deliveryOptions.forEach((option) => {
            if(cartItem.deliveryOptionsId === option.id){
                shippingMoney += option.priceCents;
            }
        })
    })
    return formatMoney(shippingMoney);
}

export function deleteQuantity(span){
    const productId = span.dataset.productId;
    deleteProduct(productId);
    
    const container = document.querySelector(`.js-cart-item-container-${productId}`)
    container.remove();
    paymentSummry();
}

export function updateDeliveryOption(productId, deliveryOptionId){
    let product;

    card.forEach((cartItem) => {
        if(productId === cartItem.productId){
            product = cartItem;
        }
    })

    product.deliveryOptionsId = deliveryOptionId;

    saveToStorage()
}