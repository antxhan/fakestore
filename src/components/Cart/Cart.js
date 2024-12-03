import { db } from "../../utils/db";

export default async function Cart() {
  //   const storage = localStorage.getItem("cart");

  //   const cart = db.get("cart");
  //   console.log(cart);

  //   db.set("cart", {
  //     items: [
  //       ...cart.items,
  //       {
  //         id: 1,
  //         name: "test",
  //         price: 100,
  //         quantity: 1,
  //       },
  //     ],
  //   });
  //   console.log(db.get("cart"));

  return `
    <div class="cart">
    this is the cart
    </div>
  `;
}
