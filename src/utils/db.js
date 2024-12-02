export const db = {
  get cart() {
    return JSON.parse(localStorage.getItem("cart") || []);
  },
  set cart(value) {
    localStorage.setItem("cart", JSON.stringify(value));
  },
  getLikes() {
    return JSON.parse(localStorage.getItem("likes") || "[]");
  },
  setLikes(productId) {
    const likes = this.getLikes();
    if (likes.includes(productId)) {
      likes.splice(likes.indexOf(productId), 1);
    } else {
      likes.push(productId);
    }
    localStorage.setItem("likes", JSON.stringify(likes));
  },
};
