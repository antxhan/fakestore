// routes.js
const routes = {
  "/": "home",
  "/products": "products",
  "/cart": "cart",
  "/checkout": "checkout",
};

// router.js
function router() {
  let path = window.location.pathname.replace(/\/$/, ""); // Normalize path
  if (path === "") path = "/";
  const page = routes[path] || "404";
  loadPage(page);
}

function loadPage(page) {
  import(`./pages/${page}.js`)
    .then((module) => {
      console.log(module);
      document.querySelector("#app").innerHTML = module.render();
    })
    .catch((err) => {
      console.log(err);
      import("./pages/404.js").then((module) => {
        document.querySelector("#app").innerHTML = module.render();
      });
    });
}

window.addEventListener("popstate", router);
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-outbound]")) {
      e.preventDefault();
      window.open(e.target.href, "_blank");
      return;
    }
    if (e.target.matches("a")) {
      e.preventDefault();
      history.pushState(null, "", e.target.href);
      router();
    }
  });
  router();
});
