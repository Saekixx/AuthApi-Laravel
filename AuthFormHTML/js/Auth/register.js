import { register } from "../authService.js";

const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = await document.getElementById("name").value;
  const email = await document.getElementById("email").value;
  const password = await document.getElementById("password").value;
  const confirmed_password =
    await document.getElementById("confirmed_password").value;

  try {
    await register(name, email, password, confirmed_password);
    alert("Registro exitoso. Por favor, inicia sesión.");
    window.location.href = "login.html";
  } catch (error) {
    console.error(error);
    alert("Error en el registro: " + error.message);
  }
});
