const themeButton = document.querySelector(".theme-btn");
const themeText = document.querySelector(".theme-btn-text");
const themeLogo = document.querySelector(".navbar img");

function setTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark)
    themeText.textContent = isDark ? "LIGHT" : "DARK";
    themeLogo.src = isDark ? "images/logo_white.svg" : "images/logo_black.svg";
    themeButton.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    localStorage.setItem("theme", isDark ? "dark" : "light")
}

setTheme(localStorage.getItem("theme") === "dark");

themeButton.addEventListener("click", () => {
    setTheme(!document.body.classList.contains("dark-mode"));
});
