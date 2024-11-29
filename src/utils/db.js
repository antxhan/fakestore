export const db = {
  get cart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  },
  set cart(value) {
    localStorage.setItem("cart", JSON.stringify(value));
  },
  get likes() {
    return JSON.parse(localStorage.getItem("likes") || "[]");
  },
  set likes(value) {
    localStorage.setItem("likes", JSON.stringify(value));
  },
};
