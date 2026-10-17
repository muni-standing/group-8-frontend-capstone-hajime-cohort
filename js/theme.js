const themeButton = document.querySelector(".theme-btn");
const themeText = document.querySelector(".theme-btn-text");

function setTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark)
    themeText.textContent = isDark ? "LIGHT" : "DARK";
    themeButton.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    localStorage.setItem("theme", isDark ? "dark" : "light")
}

setTheme(localStorage.getItem("theme") === "dark");

themeButton.addEventListener("click", () => {
    setTheme(!document.body.classList.contains("dark-mode"));
});
