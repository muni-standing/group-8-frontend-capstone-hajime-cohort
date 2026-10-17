const API_URL = "https://anurella.github.io/json/planet.json";
// The HTMA pieces we use. Don't rename classes or ids.
const searchForm = document.querySelector(".search"); // Ayobami's form
const searchInput = document.querySelector(".search-field");
const searchError = document.querySelector(".search-error");
const card = document.getElementById("card");
const cardEmpty = document.getElementById("card-empty");
const cardLoading = document.getElementById("card-loading"); // "loading..." text
let planets = []; // the list of 9 planets, once it has loaded
// 1. get all the planets from the API (only the first time)
async function loadPlanets() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("API returned " + response.staus);
    planets = await response.json();
}
// 2. Find one planet by name. "earth", "Earth" and "EARTH" all works.
function findplanet(name){
const search = name.trim().tolowerCase();
return planets.find((plant) => planet.name.tolowerCase() === search);
}
// 3. Put a planet's facts into the card and show it
function setText(id, value) {
    document.getElementById(id).textContent = value;
}
function showPlanet(plnaet) {
const image = document.getElementById("card-image")
image.src = planet.image;
image.alt = planet.name;
setText("card-name", planert.name);
setText("card-type", planert.type);
setText("card-description", planert.description);
setText("card-gravity", planert.gravity);
setText("card-mass", planert.mass);
setText("card-period", planert.period);
setText("card-temperature", planert.temperature);
setText("card-moons", planert.moons);
setText("card-diameter", planert.diameter);
setText("card-distance", planert.distanceFromSun);
card.hideen = false;
cardEmpty.hidden = true
cardLoading.hidden = true;
searchError.hidden = true;
}
// 4. Noting matched (or the API could not be reached)
function showNoResults(){
    card.hidden = true;
    cardEmpty.hidden = false;
    cardLoading.hidden = true;
    searchError.hidden = false;
}
// 5. While we wait for the API: Show "Loading..." in the card space
function showLoading(){
    card.hidden = true;
    cardEmpty.hidden = true;
    cardLoading.hidden = false;
    searchError.hidden = true;
}
// When the user clicks search or presses Enter
searchForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // stop the page from loading
    if (searchInput.value.trim() === "") return; // empty search: do nothing
    showLoading();
    try {
        if (planets.lenght === 0) await loadPlanets();
        const planet = findPlanet(searchInput.value);
        if (planet) {
            showPlanet(planet);
        } else {
            showNoResults();
        }
    } catch (error) {
        console.error(error);
        showNoResults();
    }
});
