export const cart = [];

export function addToCart(productId) {
  let matchingCartItem;

  cart.forEach((CartItem) => {
    if (productId === CartItem.productId) {
      matchingCartItem = CartItem;
    }
  });

  if (matchingCartItem) {
    matchingCartItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }
}


