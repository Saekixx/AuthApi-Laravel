const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");
const email = urlParams.get("email");
const name = urlParams.get("name");

if (token) localStorage.setItem("token", token);

if (email) localStorage.setItem("email", email);

if (name) {
  localStorage.setItem(
    "user",
    JSON.stringify({ name: decodeURIComponent(name) }),
  );
}

const cleanUrl = window.location.origin + window.location.pathname;
window.history.replaceState({}, document.title, cleanUrl);
