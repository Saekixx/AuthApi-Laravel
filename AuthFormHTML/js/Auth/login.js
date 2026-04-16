import { login } from "../authService.js";

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = await document.getElementById("email").value;
  const password = await document.getElementById("password").value;

  try {
    const data = await login(email, password);

    console.log(data);
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error(error);
  }
});
