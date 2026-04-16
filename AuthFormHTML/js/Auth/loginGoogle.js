import { loginWithGoogle } from "../authService.js";

const googleButton = document.getElementById("google-login");

googleButton.addEventListener("click", async () => {
  try {
    await loginWithGoogle();
  } catch (error) {
    console.error("Error during Google login:", error);
  }
});
