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
            quantity: selectOption(productId)
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

export function deleteQuantity(span){
    const productId = span.dataset.productId;
    deleteProduct(productId);
    
    const container = document.querySelector(`.js-cart-item-container-${productId}`)
    container.remove();
}