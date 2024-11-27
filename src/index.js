const REPO_NAME = "fakestore";

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
      // console.log(module);
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
      console.log(e.target.href);
      if (process.env.NODE_ENV === "production") {
        let path = new URL(e.target.href).pathname.replace(/\/$/, "");
        if (path === "") path = "/";
        console.log(path);
        history.pushState(
          null,
          "",
          `https://antxhan.github.io/fakestore${path}`
        );
      } else {
        history.pushState(null, "", e.target.href);
      }
      router();
    }
  });
  router();
});
