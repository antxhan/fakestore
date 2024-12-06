export function toCapitalize(str) {
  if (typeof str !== "string" || str.length === 0) {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function sumTotal(cartItems) {
  return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
}
