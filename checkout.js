import { cart, removeFromCart } from "./data/cart.js";
import { products } from "./data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "./data/deliveryOptions.js";

const day = dayjs();

const deliveryDay = day.add(3, "days");
console.log(deliveryDay.format("dddd,MMMM D"));

let cartSumaaryHtml = "";

cart.forEach((CartItem) => {
  const productId = CartItem.productId;
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  cartSumaaryHtml += `<div class="cart-item-container
    js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
           ${matchingProduct.name}
          </div>
          <div class="product-price">
            ${matchingProduct.price}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${CartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-upadte-link">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link"
             data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
            ${deliveryOptionsHtml(matchingProduct)}
          </div>
         
          </div>
        </div>
    </div>
    `;

  function deliveryOptionsHtml(matchingProduct) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDay, "days");
      const dayString = deliveryDate.format("dddd,MMMM D");
      const priceString =
        deliveryOption.price === 0 ? "FREE" : `$${deliveryOption.price}`;

      html += `<div class="delivery-option">
             <input type="radio"
               class="delivery-option-input"
               name="delivery-option-${matchingProduct.id}">
             <div>
               <div class="delivery-option-date">
                 ${dayString}
               </div>
               <div class="delivery-option-price">
                 $${priceString} - Shipping
               </div>
             </div>
           </div>
         </div>
         `;
    });

    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSumaaryHtml;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      container.remove();
    });
  });
});
