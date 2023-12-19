import { cart, removeFromCart,  upadteDeliveryOption } from "./data/cart.js";
import { products } from "./data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "./data/deliveryOptions.js";

const day = dayjs();

const deliveryDay = day.add(3, "days");
console.log(deliveryDay.format("dddd, MMMM D"));

let cartSummaryHtml = "";

cart.forEach((CartItem) => {
  const productId = CartItem.productId;
  let matchingProduct = products.find((product) => product.id === productId);

  const deliveryOptionId = CartItem.deliveryOptionId;
  let deliveryOption = deliveryOptions.find((option) => option.id === deliveryOptionId);

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDay, "days");
  const dayString = deliveryDate.format("dddd, MMMM D");

  cartSummaryHtml += `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">Delivery date: ${dayString}</div>
    <div class="cart-item-details-grid">
      <img class="product-image" src="${matchingProduct.image}">
      <div class="cart-item-details">
        <div class="product-name">${matchingProduct.name}</div>
        <div class="product-price">${matchingProduct.price}</div>
        <div class="product-quantity">
          <span>Quantity: <span class="quantity-label">${CartItem.quantity}</span></span>
          <span class="update-quantity-link link-primary js-update-link">Update</span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">Delete</span>
        </div>
      </div>
      <div class="delivery-options>
        <div class="delivery-options-title">Choose a delivery option:${deliveryOptionsHtml(matchingProduct, CartItem)}</div>
      </div>
    </div>
  </div>`;
});

function deliveryOptionsHtml(matchingProduct, cartItem) {
  let html = "";
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDay, "days");
    const dayString = deliveryDate.format("dddd, MMMM D");
    const priceString = deliveryOption.price === 0 ? "FREE" : `$${deliveryOption.price}`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    html += `<div class="delivery-option  js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
      <input type="radio" ${isChecked ? "checked" : ""} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">${dayString}</div>
        <div class="delivery-option-price">$${priceString} - Shipping</div>
      </div>
    </div>`;
  });
  return html;
}

document.querySelector(".js-order-summary").innerHTML = cartSummaryHtml;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
  });
});

document.querySelectorAll(".js-delivery-option").forEach((element) => {
  const { productId, deliveryOptionId } = element.dataset;
  element.addEventListener("click", () => {
    upadteDeliveryOption(productId, deliveryOptionId); // Ensure this function exists and works as expected
    // Maybe update the UI based on the selected delivery option here
  });
});
