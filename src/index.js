import "./global.css";

function addSearchListener() {
  const searchBar = document.querySelector(".search-bar");
  const searchBarInput = searchBar.querySelector("input");
  searchBar.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = `/fakestore/products?q=${searchBarInput.value}`;
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const countryList = document.getElementById("country-list");
  const selectedCountry = document.querySelector(".selected-country");

  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries = await response.json();

    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

    countries.forEach((country) => {
      const countryItem = document.createElement("div");
      countryItem.classList.add("country-item");
      countryItem.innerHTML = `
          <span>${country.name.common}</span>
          <img src="${country.flags.svg}" alt="${country.name.common} flag" class="country-flag">
        `;
      countryItem.addEventListener("click", () => {
        selectedCountry.innerHTML = countryItem.innerHTML;
        countryList.style.display = "none";
      });
      countryList.appendChild(countryItem);
    });

    selectedCountry.addEventListener("click", () => {
      countryList.style.display =
        countryList.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".country-dropdown")) {
        countryList.style.display = "none";
      }
    });
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
});

function router() {
  let path = window.location.pathname;
  path = path.replace(/\/$/, "");

  // adjust path for github pages deployment
  // (e.g., '/fakestore/path' -> '/path')
  const GITHUB_BASE_PATH = "/fakestore";
  if (path.startsWith(GITHUB_BASE_PATH)) {
    path = path.slice(GITHUB_BASE_PATH.length);
  }

  if (!path || path === "/" || path === GITHUB_BASE_PATH) {
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
  import(`./pages/${page}/${page}.js`)
    .then(async (module) => {
      document.querySelector("#app").innerHTML = await module.render(
        reloadPage
      );
    })
    .catch((err) => {
      console.log(err);
      import("./pages/404/404.js").then((module) => {
        document.querySelector("#app").innerHTML = module.render(reloadPage);
      });
    });
}

addSearchListener();

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
