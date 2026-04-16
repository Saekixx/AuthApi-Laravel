import { logout } from "../authService.js";

const logoutButton = document.getElementById("logout-btn");

logoutButton.addEventListener("click", async () => {
  try {
    await logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "login.html";
  } catch (error) {
    console.error("Error during logout:", error);
  }
});
