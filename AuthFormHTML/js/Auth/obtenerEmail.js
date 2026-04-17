import { resetPasswordEmail } from "../authService.js";

const form = document.getElementById("forgot-email-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = form.email.value;

  try {
    await resetPasswordEmail(email);
    alert("Se ha enviado un enlace de recuperación a tu correo electrónico.");
  } catch (error) {
    alert("Ocurrió un error al enviar el enlace de recuperación.");
  }

  form.reset();
});
