import { getTotalMoney, getShippingMoney } from "../data/card.js";
import {formatMoney} from "../scripts/utils/money.js";
import { getTotalQuantity } from "../data/card.js";

export function paymentSummry(){
    const totalBeforeTax = Number(formatMoney(getTotalMoney())) + Number(getShippingMoney());
    const paymentSummryHTML = `
      <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row js-payment-row-head">
        <div>Items (${getTotalQuantity()}):</div>
      <div class="payment-summary-money">$${formatMoney(getTotalMoney())}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money js-shipping-money">$${getShippingMoney()}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money js-total-before-tax">$${totalBeforeTax.toFixed(2)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money js-estimated-tax">$${(totalBeforeTax + (totalBeforeTax/10)).toFixed(2)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money js-final-money">$${(totalBeforeTax + (totalBeforeTax/10)).toFixed(2)}</div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>
      `;
      document.querySelector('.js-payment-summary').innerHTML = paymentSummryHTML;    
}