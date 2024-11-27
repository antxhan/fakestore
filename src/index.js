console.log("Webpack Dev Server is running!");

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
  console.log("path", path);
  const page = routes[path] || "404";
  loadPage(page);
}

function loadPage(page) {
  console.log("page;", page);
  import(`./pages/${page}.js`)
    .then((module) => {
      console.log(module);
      document.querySelector("body").innerHTML = module.render();
    })
    .catch((err) => {
      console.log(err);
      // should default to 404.js and not the line below
      // document.querySelector("body").innerHTML = "<h1>Page Not Found</h1>";
    });
}

window.addEventListener("popstate", router);
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-outbound]")) {
      e.preventDefault();
      window.open(e.target.href, "_blank");
    }
    if (e.target.matches("a")) {
      e.preventDefault();
      history.pushState(null, "", e.target.href);
      router();
    }
  });
  router();
});
