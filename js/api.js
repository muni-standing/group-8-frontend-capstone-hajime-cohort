
const API_URL = "https://anurella.github.io/json/planet.json";

// HTML elements used by the search feature
const searchForm = document.querySelector(".search");
const searchInput = document.querySelector(".search-field");
const searchError = document.querySelector(".search-error");

const card = document.getElementById("card");
const cardEmpty = document.getElementById("card-empty");
const cardLoading = document.getElementById("card-loading");

// Store the planets after fetching them
let planets = [];

// 1. Fetch planet data from the API
async function loadPlanets() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("API returned " + response.status);
    }

    planets = await response.json();
}

// 2. Find a planet by name (case-insensitive)
function findPlanet(name) {
    const search = name.trim().toLowerCase();

    return planets.find(
        (planet) => planet.name.toLowerCase() === search
    );
}

// 3. Update a text element
function setText(id, value) {
    document.getElementById(id).textContent = value;
}

// 4. Display the selected planet
function showPlanet(planet) {
    const image = document.getElementById("card-image");

    image.src = planet.image;
    image.alt = "Planet " + planet.name;

    setText("card-name", planet.name);
    setText("card-type", planet.type);
    setText("card-description", planet.description);
    setText("card-gravity", planet.gravity);
    setText("card-mass", planet.mass);
    setText("card-period", planet.period);
    setText("card-temperature", planet.temperature);
    setText("card-moons", planet.moons);
    setText("card-diameter", planet.diameter);
    setText("card-distance", planet.distanceFromSun);

    card.hidden = false;
    cardEmpty.hidden = true;
    cardLoading.hidden = true;
    searchError.hidden = true;
}

// 5. Display a message when no planet is found
function showNoResults() {
    card.hidden = true;
    cardEmpty.hidden = false;
    cardLoading.hidden = true;
    searchError.hidden = false;
}

// 6. Display the loading state
function showLoading() {
    card.hidden = true;
    cardEmpty.hidden = true;
    cardLoading.hidden = false;
    searchError.hidden = true;
}

// 7. Handle planet searches
searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const query = searchInput.value.trim();

    // Ignore empty searches
    if (query === "") return;

    showLoading();

    try {
        // Fetch the API data only if we haven't loaded it yet
        if (planets.length === 0) {
            await loadPlanets();
        }

        const planet = findPlanet(query);

        if (planet) {
            showPlanet(planet);
        } else {
            showNoResults();
        }
    } catch (error) {
        console.error("Planet search failed:", error);
        showNoResults();
    }
});
