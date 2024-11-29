import "./global.css";

const REPO_NAME = "fakestore";

// routes.js
const routes = {
  "/": "home",
  "/products": "products",
  "/cart": "cart",
  "/checkout": "checkout",
};

function router() {
  let path = window.location.pathname;
  path = path.replace(/\/$/, "");

  // adjust path for github pages deployment
  // (e.g., '/fakestore/path' -> '/path')
  const GITHUB_BASE_PATH = "/fakestore";
  if (path.startsWith(GITHUB_BASE_PATH)) {
    path = path.slice(GITHUB_BASE_PATH.length);
  }

  if (!path) {
    path = "/home";
  }
  const page = path.slice(1) || "404";
  loadPage(page);
}

function reloadPage(html) {
  // if the page has async components,
  // this callback updates the DOM with the new HTML
  document.querySelector("#app").innerHTML = html;
}

function loadPage(page) {
  import(`./pages/${page}.js`)
    .then(async (module) => {
      document.querySelector("#app").innerHTML = await module.render(
        reloadPage
      );
    })
    .catch((err) => {
      console.log(err);
      import("./pages/404.js").then((module) => {
        document.querySelector("#app").innerHTML = module.render(reloadPage);
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
