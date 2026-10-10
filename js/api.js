const API_URL = "https://anurella.github.io/json/planet.json";

// ---------------------------------------------------------------------------
// DOM references (don't rename these classes or ids)
// ---------------------------------------------------------------------------
const searchForm = document.querySelector(".search");
const searchInput = document.querySelector(".search-field");
const searchError = document.querySelector(".search-error");

const card = document.getElementById("card");
const cardEmpty = document.getElementById("card-empty");
const cardLoading = document.getElementById("card-loading");

// Maps each element id in the card to the planet property it displays
const CARD_FIELDS = {
  "card-name": "name",
  "card-type": "type",
  "card-description": "description",
  "card-gravity": "gravity",
  "card-mass": "mass",
  "card-period": "period",
  "card-temperature": "temperature",
  "card-moons": "moons",
  "card-diameter": "diameter",
  "card-distance": "distanceFromSun",
};

let planets = []; // filled once, the first time the user searches

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
async function loadPlanets() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error(`API returned ${response.status}`);
  planets = await response.json();
}

// "earth", "Earth" and "  EARTH " all match
function findPlanet(name) {
  const query = name.trim().toLowerCase();
  return planets.find((planet) => planet.name.toLowerCase() === query);
}

// ---------------------------------------------------------------------------
// View helpers
// ---------------------------------------------------------------------------
function setText(id, value) {
  document.getElementById(id).textContent = value;
}

// Show exactly one of: card, empty state, loading, with the error flag on/off
function setView({ showCard = false, showEmpty = false, showLoadingText = false, showError = false }) {
  card.hidden = !showCard;
  cardEmpty.hidden = !showEmpty;
  cardLoading.hidden = !showLoadingText;
  searchError.hidden = !showError;
}

function showPlanet(planet) {
  const image = document.getElementById("card-image");
  image.src = planet.image;
  image.alt = planet.name;

  for (const [id, property] of Object.entries(CARD_FIELDS)) {
    setText(id, planet[property]);
  }

  setView({ showCard: true });
}

// Nothing matched, or the API could not be reached
function showNoResults() {
  setView({ showEmpty: true, showError: true });
}

// While waiting for the API
function showLoading() {
  setView({ showLoadingText: true });
}

// ---------------------------------------------------------------------------
// Events: user clicks Search or presses Enter
// ---------------------------------------------------------------------------
searchForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // stop the page from reloading

  const query = searchInput.value;
  if (query.trim() === "") return; // empty search: do nothing

  showLoading();

  try {
    if (planets.length === 0) await loadPlanets();

    const planet = findPlanet(query);
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
