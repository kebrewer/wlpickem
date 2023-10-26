import ConfirmationPageView from "./views/ConfirmationPageView.js";
import SelectionPageView from "./views/SelectionPageView.js";
import LandingPageView from "./views/LandingPageView.js";
import WinnerPageView from "./views/WinnerPageView.js";
import ScorePageView from "./views/ScorePageView.js";
import HomePageView from "./views/HomePageView.js";


const routes = {
  home: HomePageView,
  landing: LandingPageView,
  selection: SelectionPageView,
  confirmation: ConfirmationPageView,
  winner: WinnerPageView,
  score: ScorePageView
};

// create a function that watches the url and calls the urlLocationHandler
const locationHandler = async () => {
  // get the url path, replace hash with empty string
  var location = window.location.hash.replace("#", "");
  // if the path length is 0, set it to primary page route
  if (location.length == 0) {
    location = "/";
    let hero = document.getElementById("herocontent");
    hero.classList.remove("hideelement");

    let appDiv = document.getElementById('app');
    appDiv.classList.add("hideelement");
  }

  let View = routes[location];

  if (View) {
    const view = new View();
    let hero = document.getElementById("herocontent");
    hero.classList.add("hideelement");

    let appDiv = document.getElementById('app');
    appDiv.classList.remove("hideelement");

    document.querySelector("#maincontent").innerHTML = await view.getHtml();
    if(document.title === 'Landing'){
      view.enableListeners();
    }

  }
};

document.addEventListener("DOMContentLoaded", () => {
  // create a function that watches the hash and calls the urlLocationHandler
  window.addEventListener("hashchange", locationHandler);
  // call the urlLocationHandler to load the page
  locationHandler();
});
