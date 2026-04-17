import { resetPassword } from "../authService.js";

const form = document.getElementById("reset-password-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const password = form.password.value;
  const confirmed_password = form.confirmed_password.value;
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  try {
    await resetPassword(token, email, password, confirmed_password);
    alert("Contraseña restablecida exitosamente. Por favor, inicia sesión.");
    window.location.href = "login.html";
  } catch (error) {
    alert("Ocurrió un error al restablecer la contraseña.");
  }
  form.reset();
});
