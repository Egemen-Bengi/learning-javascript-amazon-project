export function formatDate(shippingTime){
    const today = new Date();
    today.setDate(today.getDate() + shippingTime);

    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const formatedDate = new Intl.DateTimeFormat('en-US', options).format(today);
    return formatedDate;
}