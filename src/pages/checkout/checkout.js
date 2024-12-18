import "./checkout.css";
import Breadcrumbs from "../../components/Breadcrumbs";

function createHTML() {
  return `
  ${Breadcrumbs("Checkout")}
    <div class="checkout-container container">
      <h2>Delivery and Payment</h2>
        <form id="delivery-form">
          <div class="form-group">
                <label for="first-name">First Name</label>
                <input type="text" id="first-name" name="first-name" required>
            </div>
            <div class="form-group">
                <label for="last-name">Last Name</label>
                <input type="text" id="last-name" name="last-name" required>
            </div>
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="personal-number">Personal Number (optional)</label>
                <input type="text" id="personal-number" name="personal-number">
            </div>
            <div class="form-group">
                <label for="postal-code">Postal Code</label>
                <input type="text" id="postal-code" name="postal-code" required>
            </div>
            <div class="form-group">
                <label for="address">Address</label>
                <input type="text" id="address" name="address" required>
            </div>
            <div class="form-group">
                <label for="city">City</label>
                <input type="text" id="city" name="city" required>
            </div>
            <div class="form-group">
                <label for="mobile-number">Mobile Number</label>
                <input type="tel" id="mobile-number" name="mobile-number" required>
            </div>
            <hr>
            <div class="form-group">
                <label for="credit-card-number">Credit Card Number</label>
                <input type="text" id="credit-card-number" name="credit-card-number" required>
            </div>
            <div class="form-group">
                <label for="security-code">Security Code</label>
                <input type="text" id="security-code" name="security-code" required>
            </div>
             <div class="name-on-card">
                <label for="sname-on-card">Name on Card</label>
                <input type="text" id="name-on-card" name="name-on-card" required>
            </div>
            <div class="form-group">
                <label for="expiration-date">Expiration Date</label>
                <input type="tel" id="expiration-date" name="expiration-date" required>
            </div>
            <div class="form-actions">
                <button type="button" id="cancel">Cancel</button>
                <button type="submit" id="complete-purchase">Complete Purchase</button>
            </div>
        </form>
    `;
}

export function render(callback) {
  const html = createHTML();

  setTimeout(() => {
    // callback to update the DOM
    if (callback) callback(html);

    const cancelButton = document.getElementById("cancel");
    console.log(cancelButton);
    const deliveryForm = document.querySelector("#delivery-form");
    console.log(deliveryForm);
    cancelButton.addEventListener("click", () => {
      console.log("click");
      deliveryForm.reset();
    });

    document
      .getElementById("delivery-form")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Thank you for your purchase!");

        window.location.href = "/fakestore";
      });
  }, 1000);

  return html;
}
