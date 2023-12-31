import Dashbord from "./pages/Dashbord.js";
import Posts from "./pages/Posts.js";
import Products from "./pages/Products.js";
import NotFound from "./pages/NotFound.js";

function router(params) {
  const routes = [
    {
      path: "/",
      view: Dashbord,
    },
    {
      path: "/posts",
      view: Posts,
    },
    {
      path: "/products",
      view: Products,
    },
    {
      path: "/not-found",
      view: NotFound,
    },
  ];
  console.log("hi 1");
  const potentialRoutes = routes.map((item) => {
    return {
      route: item,
      isMatch: location.pathname === item.path,
    };
  });
  let match = potentialRoutes.find((item) => item.isMatch);
  // console.log(potentialRoutes);
  // console.log("hi 1");
  // console.log(match.route.view());
  if (!match) {
    match = {
      route: {
        path: "/not-found",
        view: NotFound,
      },
      isMatch: true,
    };
  }
  console.log(match.route.view());
  document.querySelector("#app").innerHTML = match.route.view();
}
//2. push user to new rout
function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}
window.addEventListener("popstate", router);

//sidbar toggler
const sidebarToggler = document.querySelector(".sidebar-toggler");
const sidebar = document.querySelector(".nav");
const versionLabel = document.querySelector(".app-version-label");

sidebarToggler.addEventListener("click", () => {
  sidebar.classList.toggle("mini-sidebar");
});

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    console.log("hi load");
    if (e.target.hasAttribute("data-link")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});
