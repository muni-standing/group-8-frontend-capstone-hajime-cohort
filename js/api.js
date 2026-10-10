const API_URL = "https://anurella.github.io/json/planet.json";
// The HTML pieces we use. Don't rename these classes or ids.
const searchForm = document. querySelector(". search"); // Ayobami's form
const searchInput = document. querySelector(" search-field");
const searchError = document. querySelector("• search-error");
const card = document. getElementById("card");
const cardEmpty = document.getElementById("card-empty");
const cardLoading = document.getElementById("card-loading"); // "Loading... " text
let planets = []; // the list of 9 planets, once it has loaded
// 1. Get all the planets from the API (only the first time)
async function loadPlanets () {
const response = await fetch(API_URL);
if (!response.ok) throw new Error("API returned " + response.status);
planets = await response. json();
}
// 2. Find one planet by name. "earth", "Earth" and " EARTH " all work.
function findPlanet(name) {
const search = name.trim(). toLowerCase ();
return planets.find((planet) → planet.name. toLowerCase() = search);
// 3. Put a planet's facts into the card and show it
function setText(id, value) {
document.getElementById(id).textContent = value;
}
function showPlanet(planet) {
const image = document.getElementById("card-image");
image. src = planet. image;
image. alt = planet. name;
setText("card-name", planet.name);
setText ("card-type" ,planet.type);
setText("card-description", planet.description);
setText("card-gravity", planet.gravity);
setText ("card-mass", planet. mass);
setText("card-period", planet.period);
setText ("card-temperature", planet. temperature);
setText("card-moons", planet. moons);
setText("card-diameter", planet. diameter);
setText("card-distance" ', planet. distanceFromSun);
card. hidden = false;
cardEmpty.hidden = true;
cardLoading.hidden = true;
searchError. hidden = true;
}
// 4. Nothing matched (or the API could not be reached)
function showNoResults) {
card.hidden = true;
cardEmpty.hidden = false;
cardLoading.hidden = true;
searchError. hidden = false;
}
// 5. While we wait for the API: show "Loading..." in the card space
function showLoading() {
card. hidden = true;
cardEmpty.hidden = true;
cardLoading. hidden = false;
searchError. hidden = true;
}
// When the user clicks Search or presses Enter
searchForm. addEventListener("submit", async (event) → { event. preventDefaultO; I/ stop the page from reloading
if (searchInput.value.trim() = "') return; // empty search: do nothing
showLoading();
try {
if (planets.length = 0) await loadPlanets);
const planet = findPlanet(searchInput.value);
if (planet) {
showPlanet(planet);
} else {
showNoResults);
}
} catch (error) {
console.error(error);
showNoResults) ;
}
}) ;

